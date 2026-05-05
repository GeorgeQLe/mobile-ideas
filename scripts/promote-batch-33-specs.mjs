import fs from "node:fs";
import path from "node:path";

const readinessDate = "2026-05-05";

const apps = [
  {
    id: 641,
    slug: "arlo-secure",
    name: "Arlo Secure",
    category: "Smart home",
    focus:
      "multi-location security dashboards, camera/doorbell/floodlight pairing, arm/disarm modes, activity zones, animated alerts, sirens, emergency-response gates, subscription video history, and shared household access",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/arlo-secure-home-security/id1459289784", "iOS listing, privacy labels, release notes, in-app purchase surface, support/developer links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.arlo.app", "Android listing, install requirements, data safety, reviews, and release cadence"],
      ["Official product site", "https://www.arlo.com/en-us/", "Product families, account model, camera/security terminology, subscription positioning, and regional availability"],
      ["Official support", "https://www.arlo.com/en-us/support/", "Device setup, troubleshooting, subscription, account, notification, and camera-behavior help articles"],
      ["Privacy policy", "https://www.arlo.com/en-us/about/privacy-policy/", "Camera, audio, location, account, analytics, sharing, and retention disclosures"],
      ["Terms", "https://www.arlo.com/en-us/terms-and-conditions.html", "Service terms, subscriptions, acceptable use, emergency limits, and warranty/support boundaries"],
    ],
    blockers: "paid Arlo Secure plan states, live camera latency, emergency-response availability, HomeKit/Alexa/Google integrations, device firmware pairing, and camera/audio push payload behavior",
  },
  {
    id: 642,
    slug: "nest",
    name: "Nest",
    category: "Smart home",
    focus:
      "Google Nest home dashboards, cameras, thermostats, doorbells, smoke alarms, home/away routines, household members, event history, Nest Aware gates, and Google-account migration boundaries",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/nest/id464988855", "iOS listing, privacy labels, release notes, and support links for the Nest app"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.nest.android", "Android listing, data safety, install requirements, and update cadence"],
      ["Official product site", "https://store.google.com/category/nest", "Nest device families, subscriptions, compatibility, and product positioning"],
      ["Official help", "https://support.google.com/googlenest/", "Device setup, home membership, alerts, subscriptions, account migration, and troubleshooting"],
      ["Privacy policy", "https://policies.google.com/privacy", "Google account, device, location, activity, voice/video, advertising, and retention disclosures"],
      ["Terms", "https://policies.google.com/terms", "Google service terms, content, account, suspension, and service-change boundaries"],
    ],
    blockers: "Google Home versus Nest app split, account migration, Nest Aware subscriptions, household sharing, live camera streams, thermostat HVAC safety, smoke/CO alarm behavior, and region/device availability",
  },
  {
    id: 643,
    slug: "eufy-security",
    name: "Eufy Security",
    category: "Smart home",
    focus:
      "security-camera home views, HomeBase/camera onboarding, local-storage versus cloud-storage choices, AI detection modes, activity zones, live view, alarm modes, and family sharing",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/eufy-security/id1424956516", "iOS listing, privacy labels, release notes, and app support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.oceanwing.battery.cam", "Android listing, data safety, ratings, and release cadence"],
      ["Official product site", "https://www.eufy.com/security", "Device families, HomeBase, storage model, subscription positioning, and compatibility"],
      ["Official support", "https://support.eufy.com/", "Setup, troubleshooting, account, storage, notification, firmware, and security camera documentation"],
      ["Privacy policy", "https://www.eufy.com/policies/privacy-policy", "Video, audio, account, device, analytics, sharing, and retention disclosures"],
      ["Terms", "https://www.eufy.com/policies/terms-of-service", "Service, account, purchase, warranty, content, and acceptable-use boundaries"],
    ],
    blockers: "local encryption/storage claims, HomeBase firmware, AI/person/package detection, video history, activity zones, battery hardware, and third-party voice assistant behavior",
  },
  {
    id: 644,
    slug: "tp-link-tapo",
    name: "TP-Link Tapo",
    category: "Smart home",
    focus:
      "Tapo camera, sensor, lighting, plug, robot-vacuum, and Matter device control with homes/rooms, scenes, automations, notifications, cloud/local storage, and device sharing",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/tp-link-tapo/id1472718009", "iOS listing, privacy labels, release notes, and in-app purchase surface"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.tplink.iot", "Android listing, data safety, compatibility, and release cadence"],
      ["Official product site", "https://www.tapo.com/", "Device families, room/home model, automation positioning, storage, and subscription information"],
      ["Official support", "https://www.tapo.com/support/", "Setup, firmware, troubleshooting, cloud service, notification, and compatibility docs"],
      ["Privacy policy", "https://www.tapo.com/privacy-policy/", "Account, device, camera/audio, location, analytics, sharing, and retention disclosures"],
      ["Terms", "https://www.tapo.com/terms-of-use/", "Service terms, accounts, content, subscriptions, support, and acceptable-use boundaries"],
    ],
    blockers: "Tapo Care subscriptions, SD-card playback, camera privacy modes, local network pairing, Matter/voice integrations, device firmware, and region-specific product catalogs",
  },
  {
    id: 645,
    slug: "kasa-smart",
    name: "Kasa Smart",
    category: "Smart home",
    focus:
      "Kasa plug, switch, bulb, strip, camera, and router-adjacent controls with rooms, schedules, scenes, away mode, camera events, firmware, and shared homes",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/kasa-smart/id1034035493", "iOS listing, privacy labels, release notes, and app support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.tplink.kasa_android", "Android listing, data safety, install requirements, and release cadence"],
      ["Official product site", "https://www.kasasmart.com/", "Kasa product families, smart-home control model, subscription positioning, and compatibility"],
      ["Official support", "https://www.kasasmart.com/us/support", "Setup, troubleshooting, camera, firmware, account, and notification support"],
      ["Privacy policy", "https://www.tp-link.com/us/privacy/", "TP-Link account, device, network, camera, location, analytics, and retention disclosures"],
      ["Terms", "https://www.tp-link.com/us/terms/", "TP-Link service, account, product, warranty, and content terms"],
    ],
    blockers: "legacy versus current Kasa hardware, local network discovery, camera recording, away-mode randomization, smart-switch electrical safety, and TP-Link account migration",
  },
  {
    id: 646,
    slug: "smart-life",
    name: "Smart Life",
    category: "Smart home",
    focus:
      "brand-agnostic Tuya ecosystem controls, device pairing, rooms, scenes, automations, sharing, alerts, energy views, widgets, and voice-assistant handoff",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/smart-life-smart-living/id1115101477", "iOS listing, privacy labels, release notes, and app support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.tuya.smartlife", "Android listing, data safety, install requirements, and release cadence"],
      ["Official product site", "https://www.ismartlife.me/", "Smart Life positioning, device categories, automations, sharing, and ecosystem scope"],
      ["Official support", "https://support.tuya.com/en/help", "Tuya/Smart Life setup, pairing, automation, account, and troubleshooting documentation"],
      ["Privacy policy", "https://developerapp.tuyaus.com/protocol/1479c8096cc01001?lang=en", "App privacy disclosures for account, device, location, automation, analytics, and sharing data"],
      ["Terms", "https://images.tuyaus.com/app/html/Service_Agreement_en.html", "Service agreement, account, device, content, subscription, and acceptable-use boundaries"],
    ],
    blockers: "OEM-specific device behavior, Bluetooth/Zigbee/Wi-Fi pairing, region cloud partitions, third-party skills, widgets, HealthKit-like device data, and app-specific AI assistant claims",
  },
  {
    id: 647,
    slug: "tuya-smart",
    name: "Tuya Smart",
    category: "Smart home",
    focus:
      "Tuya Smart device ecosystem controls, homes/rooms, one-tap scenes, conditional automations, member sharing, device alerts, AI assistant surfaces, and IoT cloud boundaries",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/tuya-smart/id1034649547", "iOS listing, privacy labels, release notes, and public app feature claims"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.tuya.smart", "Android listing, data safety, install requirements, and release cadence"],
      ["Official product site", "https://www.tuya.com/", "Tuya ecosystem, IoT cloud, app platform, device categories, and regional service positioning"],
      ["Official support", "https://support.tuya.com/en/help", "Setup, pairing, automation, account, and troubleshooting documentation"],
      ["Privacy policy", "https://www.tuya.com/privacy-policy", "Corporate privacy disclosures for account, device, location, analytics, and cloud service data"],
      ["Terms", "https://www.tuya.com/terms-of-service", "Tuya service terms, platform boundaries, account, content, and acceptable-use terms"],
    ],
    blockers: "OEM device variance, AI assistant behavior, HealthKit-adjacent scale data, cloud-region behavior, third-party integrations, and unsupported device categories",
  },
  {
    id: 648,
    slug: "ewelink",
    name: "eWeLink",
    category: "Smart home",
    focus:
      "eWeLink homes, Sonoff-style device pairing, scenes, LAN control hints, timers, inching modes, energy monitoring, sharing, camera/doorbell alerts, and premium gates",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/ewelink-smart-home/id1035163158", "iOS listing, privacy labels, release notes, and app support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.coolkit", "Android listing, data safety, compatibility, and release cadence"],
      ["Official product site", "https://ewelink.cc/", "eWeLink app, supported device ecosystem, premium features, and smart-home control model"],
      ["Official help", "https://help.ewelink.cc/hc/en-us", "Setup, sharing, scenes, timers, subscriptions, account, and troubleshooting docs"],
      ["Privacy policy", "https://ewelink.cc/privacy-policy/", "Account, device, location, automation, analytics, sharing, and retention disclosures"],
      ["Terms", "https://ewelink.cc/terms-of-use/", "Service terms, account, subscriptions, supported devices, and acceptable-use boundaries"],
    ],
    blockers: "LAN control behavior, third-party device compatibility, Sonoff firmware, premium feature gates, Matter/Alexa/Google integrations, and camera/audio payloads",
  },
  {
    id: 649,
    slug: "august-home",
    name: "August Home",
    category: "Smart home",
    focus:
      "smart-lock setup, door status, lock/unlock controls, Auto-Unlock/Auto-Lock, guest keys, activity feed, keypad/bridge hardware, and security/account recovery",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/august-home/id648730592", "iOS listing, privacy labels, release notes, and app support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.august.luna", "Android listing, data safety, install requirements, and release cadence"],
      ["Official product site", "https://august.com/", "Smart-lock products, account model, access sharing, compatibility, and security positioning"],
      ["Official support", "https://support.august.com/", "Installation, lock calibration, guest access, Auto-Unlock, bridge, and troubleshooting docs"],
      ["Privacy policy", "https://august.com/pages/privacy-policy", "Location, lock activity, account, household sharing, analytics, and retention disclosures"],
      ["Terms", "https://august.com/pages/terms-of-service", "Service, account, access-sharing, hardware, support, and acceptable-use boundaries"],
    ],
    blockers: "real lock/unlock safety, Bluetooth proximity, Auto-Unlock geofencing, door-sense calibration, bridge connectivity, guest access revocation, and emergency lockout recovery",
  },
  {
    id: 650,
    slug: "yale-access",
    name: "Yale Access",
    category: "Smart home",
    focus:
      "Yale smart-lock onboarding, lock status, app unlock, guest access, access schedules, activity logs, keypad/bridge setup, and account security",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/yale-access/id1458313373", "iOS listing, privacy labels, release notes, and app support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.assaabloy.yale", "Android listing, data safety, install requirements, and release cadence"],
      ["Official product site", "https://www.yalehome.com/us/en/yale-access", "Yale Access app scope, lock families, modules, bridges, and compatibility"],
      ["Official support", "https://support.shopyalehome.com/", "Installation, access sharing, lock calibration, guest keys, troubleshooting, and account docs"],
      ["Privacy center", "https://www.yalehome.com/us/en/privacy-center", "Privacy disclosures, data rights, account, device, location, and sharing information"],
      ["Terms", "https://www.yalehome.com/us/en/terms-and-conditions", "Terms, product/service boundaries, account, warranty, and support limitations"],
    ],
    blockers: "real lock operation, access-code sync, bridge/module compatibility, Bluetooth/geofence behavior, guest revocation timing, and region-specific Yale/ASSA ABLOY legal pages",
  },
  {
    id: 651,
    slug: "ecobee",
    name: "Ecobee",
    category: "Smart home",
    focus:
      "thermostat dashboards, comfort settings, schedules, occupancy sensors, energy reports, home monitoring, camera/doorbell adjuncts, and subscription/service gates",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/ecobee/id916985674", "iOS listing, privacy labels, release notes, and app support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.ecobee.athenamobile", "Android listing, data safety, compatibility, and release cadence"],
      ["Official product site", "https://www.ecobee.com/", "Thermostat, sensor, camera, monitoring, and energy-management product positioning"],
      ["Official support", "https://support.ecobee.com/s/", "Setup, HVAC configuration, schedules, sensors, alerts, and troubleshooting docs"],
      ["Privacy policy", "https://www.ecobee.com/en-us/privacy-policy/", "Home, occupancy, energy, device, account, analytics, and sharing disclosures"],
      ["Terms", "https://www.ecobee.com/en-us/terms-of-use/", "Service terms, account, product, monitoring, subscriptions, and acceptable-use boundaries"],
    ],
    blockers: "HVAC safety, equipment compatibility, occupancy sensors, energy-report calculations, home monitoring, voice integrations, and real thermostat command timing",
  },
  {
    id: 652,
    slug: "honeywell-home",
    name: "Honeywell Home",
    category: "Smart home",
    focus:
      "thermostat, camera, water-leak, security, and connected-home control with locations, schedules, geofence modes, alerts, device sharing, and Resideo account boundaries",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/honeywell-home/id565912139", "iOS listing, privacy labels, release notes, and app support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.honeywell.android.lyric", "Android listing, data safety, install requirements, and release cadence"],
      ["Official product site", "https://www.honeywellhome.com/", "Honeywell Home/Resideo products, device families, app scope, and compatibility"],
      ["Official support", "https://support.honeywellhome.com/", "Setup, thermostat schedules, geofence, alerts, account, and troubleshooting docs"],
      ["Privacy policy", "https://www.resideo.com/us/en/corporate/legal/privacy/", "Resideo account, home/device, location, analytics, marketing, and retention disclosures"],
      ["Terms", "https://www.resideo.com/us/en/corporate/legal/terms-and-conditions/", "Service, product, account, warranty, subscriptions, and support boundaries"],
    ],
    blockers: "HVAC safety, geofence behavior, Resideo account states, legacy device compatibility, water-leak/safety alerts, and camera/security hardware behavior",
  },
  {
    id: 653,
    slug: "myq",
    name: "myQ",
    category: "Smart home",
    focus:
      "garage-door and gate control, device onboarding, real-time door status, activity history, schedules, guest/household access, delivery integrations, and safety notifications",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/myq-garage-access-control/id456282559", "iOS listing, privacy labels, release notes, and app support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.chamberlain.android.liftmaster.myq", "Android listing, data safety, install requirements, and release cadence"],
      ["Official product site", "https://www.myq.com/", "Garage/gate products, smart access features, subscriptions, partners, and compatibility"],
      ["Official support", "https://support.chamberlaingroup.com/s/myq", "Setup, troubleshooting, access sharing, notifications, subscriptions, and device support"],
      ["Privacy policy", "https://www.myq.com/privacy-policy", "Access activity, device, location, account, partner, analytics, and retention disclosures"],
      ["Terms", "https://www.myq.com/terms-of-use", "Service terms, smart access, subscriptions, accounts, and acceptable-use boundaries"],
    ],
    blockers: "real door/gate movement safety, obstruction sensors, delivery partner access, subscription video features, notification timing, and region/operator hardware compatibility",
  },
  {
    id: 654,
    slug: "simplisafe",
    name: "SimpliSafe",
    category: "Smart home",
    focus:
      "security-system arming, sensor/camera status, alarm event handling, monitoring-plan gates, camera history, emergency dispatch boundaries, family access, and device setup",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/simplisafe-home-security-app/id555798051", "iOS listing, privacy labels, release notes, and in-app purchase/support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.simplisafe.mobile", "Android listing, data safety, compatibility, and release cadence"],
      ["Official product site", "https://simplisafe.com/", "Security system products, monitoring plans, cameras, sensors, and service positioning"],
      ["Official support", "https://support.simplisafe.com/", "Setup, monitoring, cameras, sensors, app, account, and troubleshooting docs"],
      ["Privacy policy", "https://simplisafe.com/privacy-policy", "Security events, camera/audio, account, device, location, monitoring, and retention disclosures"],
      ["Terms", "https://simplisafe.com/terms-of-sale", "Purchase, subscription, monitoring, equipment, warranty, and service boundaries"],
    ],
    blockers: "professional monitoring dispatch, alarm handling, camera recordings, sensor hardware, account verification, subscriptions, and jurisdiction-specific emergency-service behavior",
  },
  {
    id: 655,
    slug: "adt-control",
    name: "ADT Control",
    category: "Smart home",
    focus:
      "professionally monitored security dashboards, arm/disarm, zones, sensors, cameras, automation devices, alerts, user codes, scenes, and dealer/installation dependencies",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/adt-control/id1423764122", "iOS listing, privacy labels, release notes, and app support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.adt.control", "Android listing, data safety, install requirements, and release cadence"],
      ["Official product site", "https://www.adt.com/adt-control", "ADT Control app scope, monitored security, camera, automation, and service positioning"],
      ["Official support", "https://help.adt.com/", "Account, app, sensors, panels, cameras, monitoring, automation, and troubleshooting docs"],
      ["Privacy policy", "https://www.adt.com/about-adt/legal/privacy-policy", "Security, account, location, device, video, marketing, and retention disclosures"],
      ["Terms", "https://www.adt.com/about-adt/legal/terms-of-use", "ADT service, account, content, monitoring, and legal-use terms"],
    ],
    blockers: "professional installation, central monitoring, panel/user-code management, emergency dispatch, camera history, dealer variations, and contract/plan eligibility",
  },
  {
    id: 656,
    slug: "vivint",
    name: "Vivint",
    category: "Smart home",
    focus:
      "integrated security and smart-home dashboards, cameras, door locks, thermostat/garage controls, scenes, alerts, professional monitoring, and panel/mobile synchronization",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/vivint/id1473006399", "iOS listing, privacy labels, release notes, and app support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.vivint.vivintsky", "Android listing, data safety, install requirements, and release cadence"],
      ["Official product site", "https://www.vivint.com/", "Security/smart-home product families, professional monitoring, service model, and compatibility"],
      ["Official support", "https://support.vivint.com/", "App, panel, cameras, locks, monitoring, account, and troubleshooting docs"],
      ["Privacy policy", "https://www.vivint.com/company/policies/privacy-policy", "Security, video/audio, device, account, location, analytics, and retention disclosures"],
      ["Terms", "https://www.vivint.com/company/policies/terms-of-use", "Service terms, accounts, monitoring, equipment, subscriptions, and acceptable-use boundaries"],
    ],
    blockers: "professional monitoring, panel state, emergency dispatch, camera clips, smart-lock control, installation-specific hardware, and account/contract eligibility",
  },
  {
    id: 657,
    slug: "blink-home-monitor",
    name: "Blink Home Monitor",
    category: "Smart home",
    focus:
      "Blink camera setup, Sync Module relationships, live view, motion alerts, privacy/activity zones, two-way audio, clip storage, Alexa integration, and subscription gates",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/blink-home-monitor/id1013961111", "iOS listing, privacy labels, release notes, in-app purchase surface, and support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.immediasemi.android.blink", "Android listing, data safety, install requirements, and release cadence"],
      ["Official product site", "https://blinkforhome.com/", "Camera/product families, subscriptions, Alexa positioning, and smart-home security features"],
      ["Official support", "https://support.blinkforhome.com/", "Setup, Sync Module, subscriptions, alerts, camera behavior, account, and troubleshooting docs"],
      ["Privacy notice", "https://blinkforhome.com/pages/privacy-notice", "Amazon/Blink account, device, audio/video, usage, analytics, and retention disclosures"],
      ["Terms", "https://blinkforhome.com/pages/terms-of-service", "Service terms, subscriptions, content, accounts, and acceptable-use boundaries"],
    ],
    blockers: "Sync Module behavior, clip cloud/local storage, live-view duration, two-way audio, Alexa integrations, subscription states, and camera motion event payloads",
  },
  {
    id: 658,
    slug: "mychart",
    name: "MyChart",
    category: "Health and medical",
    focus:
      "patient-portal onboarding, organization selection, appointment scheduling, test results, medications, secure messages, proxy access, bill pay, telehealth launch, health summaries, and records export",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/mychart/id382952264", "iOS listing, privacy labels, release notes, supported device claims, and app support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=epic.mychart.android", "Android listing, data safety, install requirements, and release cadence"],
      ["Official product site", "https://www.mychart.org/", "Patient portal scope, organization selection, sign-in model, and public feature overview"],
      ["Official help", "https://www.mychart.org/Help", "Account access, appointments, messaging, test results, proxy access, billing, and troubleshooting"],
      ["Privacy policy", "https://www.mychart.org/Privacy", "Portal privacy disclosures and redirect boundaries for provider-specific policies"],
      ["Terms", "https://www.mychart.org/Terms", "Portal terms, account, content, provider organization, and medical-information boundaries"],
    ],
    blockers: "provider-specific MyChart configuration, HIPAA-covered workflows, proxy access, test-result release rules, appointment availability, telehealth launch, billing, and medical-record export format",
  },
  {
    id: 659,
    slug: "doximity",
    name: "Doximity",
    category: "Health and medical",
    focus:
      "clinician identity verification, professional profile, network/search, secure communication, news/feed, Dialer/video tools, fax/clinical document workflow, CME, and recruiter/industry boundaries",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/doximity/id472929854", "iOS listing, privacy labels, release notes, and app support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.doximity.doximitydroid", "Android listing, data safety, install requirements, and release cadence"],
      ["Official product site", "https://www.doximity.com/", "Professional network, communication, Dialer, profile, news, and career/product positioning"],
      ["Official support", "https://support.doximity.com/", "Account verification, Dialer, profile, fax, CME, messaging, and troubleshooting docs"],
      ["Privacy policy", "https://www.doximity.com/about/privacy", "Professional profile, health-care communication, analytics, advertising, and retention disclosures"],
      ["Terms", "https://www.doximity.com/about/terms", "Service, account, professional conduct, content, privacy, and acceptable-use boundaries"],
    ],
    blockers: "medical-professional identity verification, Dialer caller-ID behavior, telehealth/video compliance, fax/document handling, clinical privacy, CME eligibility, and healthcare advertising boundaries",
  },
  {
    id: 660,
    slug: "cvs-health",
    name: "CVS Health",
    category: "Health and medical",
    focus:
      "CVS Health app pharmacy refills, prescription history, pickup barcode, ExtraCare offers, store shopping, MinuteClinic scheduling, vaccines, benefits cards, telehealth links, photos, and consumer-health privacy controls",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/cvs-health/id395545555", "iOS listing, privacy labels, release notes, category, and app feature claims"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.cvs.launchers.cvs", "Android listing, data safety, install requirements, and release cadence"],
      ["Official product site", "https://www.cvs.com/mobile-cvs/apps", "CVS app feature overview, pharmacy, deals, shopping, health services, and account surface"],
      ["Official help", "https://www.cvs.com/help/help_index.jsp", "Account, pharmacy, ExtraCare, orders, MinuteClinic, benefits, and troubleshooting help"],
      ["Privacy policy", "https://www.cvs.com/retail/help/privacy_policy", "CVS app, pharmacy, shopping, ExtraCare, health service, advertising, and consumer-health disclosures"],
      ["Terms", "https://www.cvs.com/retail/help/terms_of_use", "CVS app/site terms, health content, pharmacy, account, orders, and service boundaries"],
    ],
    blockers: "pharmacy account linking, prescription refill authority, HIPAA/PHI handling, MinuteClinic availability, insurance/Caremark/Aetna eligibility, pickup barcode behavior, payment, and store inventory accuracy",
  },
];

const smartScreenRows = [
  ["Welcome/Auth", "Account entry, legal acceptance, restored session, or invite acceptance", "email, password, SSO, invite link, region", "new, returning, invited, locked, migrated", "offline, MFA required, region unsupported, account suspended"],
  ["Home/Dashboard", "Homes, rooms, locations, devices, and summary alerts", "taps, pull refresh, home switch, filter", "empty, loading, healthy, alerting, partial outage", "stale device state, cloud outage, permission revoked"],
  ["Device Setup", "Pair or claim a supported device", "QR code, Bluetooth, Wi-Fi, hub, serial", "permission primer, scanning, joining, naming, success", "unsupported device, bad QR, wrong network, firmware update"],
  ["Device Detail", "Control and inspect one device", "toggle, slider, mode, schedule, live view", "online, offline, updating, locked, shared", "unsafe command blocked, stale telemetry, conflicting owner change"],
  ["Camera/Media", "Live view, clips, events, zones, and audio controls where applicable", "play, scrub, talk, download, zone edit", "live, buffering, recorded, expired, gated", "camera offline, no plan, clip missing, microphone denied"],
  ["Scenes/Automations", "Rules, schedules, routines, geofences, and device triggers", "conditions, actions, time, location, members", "draft, enabled, paused, invalid, completed", "unsafe automation, missing device, conflicting rules"],
  ["Activity/Alerts", "Security, device, automation, and account event feed", "filter, acknowledge, deep link", "empty, unread, grouped, critical, archived", "duplicate push, delayed event, missing media"],
  ["Members/Sharing", "Household, guest, installer, or temporary access management", "role, invite, code, expiration", "owner, admin, guest, pending, revoked", "stale invite, overbroad access, revocation delay"],
  ["Subscriptions", "Entitlements for history, AI, monitoring, storage, or advanced controls", "plan selection, restore, cancel, receipt", "free, trial, active, expired, unavailable", "cross-platform mismatch, refund, billing outage"],
  ["Settings/Support", "Account, privacy, device maintenance, help, data rights, and deletion", "forms, toggles, links, support case", "loaded, editing, exporting, deleting", "pending support case, account deletion with active devices"],
];

const healthScreenRows = [
  ["Welcome/Auth", "Account entry, identity proofing, organization selection, and consent", "email, password, SSO, code, organization", "new, returning, verified, proxy, locked", "MFA required, unsupported provider, expired invite"],
  ["Home/Dashboard", "Personalized health, care, pharmacy, or clinician workspace summary", "taps, pull refresh, filter, deep link", "empty, loading, current, attention, stale", "provider outage, consent missing, partial account link"],
  ["Profile/Eligibility", "Demographics, identity, benefits, professional or patient verification", "forms, document upload, plan card, license", "draft, verified, pending, rejected, expired", "name mismatch, document rejected, eligibility unavailable"],
  ["Care/Orders", "Appointment, refill, message, telehealth, professional communication, or order flow", "forms, date/time, clinician, location, payment", "draft, submitted, confirmed, completed", "clinical unavailable, refill denied, unsafe request"],
  ["Records/Results", "Clinical, pharmacy, professional, or activity record review", "filter, open, download, share", "empty, loaded, sensitive, delayed, exported", "data withheld, release delay, mismatched patient"],
  ["Messages/Notifications", "Secure messages, reminders, alerts, results, order and appointment updates", "compose, reply, category, preference", "unread, sent, pending, escalated", "urgent content warning, delivery failure, disabled push"],
  ["Payments/Benefits", "Bills, copays, insurance, rewards, subscriptions, or employer/provider benefits", "card, wallet, coupon, claim, benefit id", "eligible, active, denied, paid, refunded", "price mismatch, benefit unavailable, regulatory hold"],
  ["Find Care/Directory", "Provider, pharmacy, location, service, clinician, or professional search", "query, location, filters, specialty", "empty, results, selected, unavailable", "closed location, out-of-network, stale directory"],
  ["Privacy/Data Rights", "Consent, data sharing, export, delete, proxy, and communication preferences", "toggles, request, confirmation", "loaded, pending, exported, deleted", "legal hold, proxy conflict, provider-owned data"],
  ["Settings/Support", "Account recovery, help, accessibility, terms, privacy, and escalation", "forms, links, support case", "loaded, editing, submitted, resolved", "urgent medical disclaimer, support backlog, locked account"],
];

function screenRows(app) {
  return (app.category === "Smart home" ? smartScreenRows : healthScreenRows)
    .map((row) => `| ${row.join(" | ")} |`)
    .join("\n");
}

function sourceRows(app) {
  return app.sources
    .map(([source, url, evidence]) => `| ${source} | ${url} | ${evidence} | Verified public URL on ${readinessDate}; hands-on native behavior still blocked. |`)
    .join("\n");
}

function domain(app) {
  return app.category === "Smart home" ? "smart-home security and device-control" : "health, pharmacy, patient, or clinician";
}

function dataModel(app) {
  if (app.category === "Smart home") {
    return [
      "`User`: account, MFA state, locale, notification preferences, deletion/export status, and support state.",
      "`Home`: location, rooms, members, subscription region, privacy settings, and shared-access rules.",
      "`Device`: model, claimed owner, room, firmware, connection state, capability flags, safety class, and last telemetry.",
      "`DeviceCredential`: encrypted pairing token, hub relationship, credential rotation metadata, and revocation state.",
      "`Scene`: name, trigger, conditions, actions, owner, enabled state, safety review status, and last run result.",
      "`Event`: append-only device, camera, security, automation, and account event with severity, media references, and retention class.",
      "`MediaAsset`: camera clip or snapshot metadata, storage location, retention expiry, entitlement gate, and share permissions.",
      "`ShareGrant`: household, guest, installer, or temporary access with role, scope, expiration, and revocation audit data.",
      "`Entitlement`: free, trial, active, expired, restored, refunded, and unavailable states for storage, AI, monitoring, or advanced controls.",
      "`AuditEvent`: security-sensitive writes including commands, member changes, automation edits, support actions, exports, and deletes.",
      "`LocalCacheRecord`: offline dashboard, device, event, and settings cache with staleness, retry, and conflict markers.",
    ];
  }

  return [
    "`User`: account, identity-verification status, consent, locale, accessibility, communication preferences, deletion/export status, and support state.",
    "`Profile`: patient, proxy, caregiver, clinician, pharmacy, member, or professional role with eligibility, organization, and verification metadata.",
    "`CareRelationship`: provider, clinic, pharmacy, organization, plan, or professional network relationship with scope and expiry.",
    "`HealthRecord`: clinical, pharmacy, benefits, appointment, message, refill, order, or professional record with provenance and release status.",
    "`Request`: refill, appointment, message, telehealth, bill, fax, document, or support request with validation, queue, and resolution state.",
    "`ConsentGrant`: sharing, proxy, marketing, notification, data export, research, or integration consent with revocation audit.",
    "`Reminder`: medication, appointment, result, refill, benefit, wellness, or professional task reminder with quiet hours and delivery history.",
    "`PaymentOrBenefit`: copay, bill, card, wallet, ExtraCare-style reward, benefit card, subscription, claim, or eligibility state.",
    "`DirectoryEntry`: provider, location, service, pharmacy, clinician, or organization listing with freshness and availability metadata.",
    "`AuditEvent`: sensitive reads/writes, identity checks, proxy changes, data exports, account deletion, support escalation, and regulatory events.",
    "`LocalCacheRecord`: encrypted offline summary cache with TTL, redaction policy, retry state, and device-lock requirements.",
  ];
}

function appSpecificJourneys(app) {
  if (app.category === "Smart home") {
    return [
      `User creates a home, pairs supported ${app.name}-style devices, names rooms, grants only required permissions, and sees devices on the dashboard.`,
      "User opens a device, sees current state with freshness, issues a low-risk command, and receives confirmation after canonical server reconciliation.",
      "User configures an automation or schedule, reviews affected devices, receives a safety warning for risky conditions, and can pause or delete the rule.",
      "User receives a push alert, opens the event, reviews related media or telemetry, acknowledges it, and can escalate to support or emergency contacts where lawful.",
      "Owner invites a household member or guest with scoped access, the invitee accepts, and the owner can audit and revoke access.",
      "User loses connectivity, sees cached state labeled as stale, can inspect history where allowed, and cannot perform unsafe or irreversible commands until reconnected.",
    ];
  }

  return [
    `User creates or restores a ${app.name}-style account, completes consent and eligibility checks, and reaches a privacy-forward dashboard.`,
    "User reviews a record, refill, message, appointment, or professional item with source/provenance, release status, and next action clearly labeled.",
    "User starts a care, pharmacy, communication, scheduling, or support request; required safety disclaimers appear before submission; the request receives a durable status.",
    "User edits notification/reminder preferences and sees the difference between transactional, care-critical, marketing, and optional wellness messages.",
    "User exports records or requests account/data deletion, sees provider-owned/legal-hold limitations, and receives an auditable request state.",
    "User attempts an urgent or clinically unsafe action and is routed to emergency disclaimers, support escalation, or provider-owned channels rather than generic app completion.",
  ];
}

function apiContracts(app) {
  if (app.category === "Smart home") {
    return [
      "Auth: `POST /auth/session`, `POST /auth/mfa`, `POST /auth/recover`, `DELETE /auth/session`, and invite-token acceptance with device-scoped session metadata.",
      "Homes: `GET /homes`, `POST /homes`, `PATCH /homes/{homeId}`, `GET /homes/{homeId}/members`, and role-scoped membership writes.",
      "Devices: `GET /devices`, `POST /devices/claim`, `PATCH /devices/{deviceId}`, `POST /devices/{deviceId}/command`, and `POST /devices/{deviceId}/firmware-check` with capability flags and idempotency keys.",
      "Events/media: `GET /events`, `GET /media`, signed clip URLs, retention metadata, entitlement gates, and immutable audit identifiers.",
      "Automations: `GET /scenes`, `POST /scenes`, `PATCH /scenes/{sceneId}`, `POST /scenes/{sceneId}/test`, and server-side validation for unsafe or impossible conditions.",
      "Sharing: `POST /share-grants`, `PATCH /share-grants/{grantId}`, and revocation endpoints that fan out invalidation events.",
      "Notifications: `POST /notification-preferences`, token registration, category-specific quiet hours, critical alert eligibility, and in-app inbox mirrors.",
      "Entitlements: `GET /entitlements`, `POST /checkout/session`, restore receipt endpoints, and webhook-backed subscription/storage/monitoring updates.",
      "Privacy/support: `POST /data-export`, `DELETE /account`, `POST /support-cases`, and explicit dependency checks for active devices, monitoring, or household ownership.",
    ];
  }

  return [
    "Auth/identity: `POST /auth/session`, `POST /auth/mfa`, `POST /identity/verify`, `POST /organizations/select`, and `POST /proxy/accept` with audit metadata.",
    "Profile/eligibility: `GET /profile`, `PATCH /profile`, `GET /eligibility`, and organization/provider/plan-scoped entitlement responses.",
    "Records: `GET /records`, `GET /records/{recordId}`, `POST /records/export`, and release-status metadata for provider-owned or delayed records.",
    "Requests: `POST /requests`, `GET /requests/{requestId}`, and type-specific validation for appointment, refill, message, telehealth, fax, bill, or support workflows.",
    "Messaging/reminders: `GET /messages`, `POST /messages`, `POST /reminders`, and transactional push categories that distinguish urgent, clinical, marketing, and optional wellness content.",
    "Directory/search: `GET /directory` with specialty/service/location/organization filters, cache freshness, and availability disclaimers.",
    "Payments/benefits: `GET /payments`, `POST /payments/session`, `GET /benefits`, and immutable receipt/claim metadata without storing raw card or regulated identifiers in the client.",
    "Privacy/support: `GET /privacy/settings`, `PATCH /privacy/settings`, `POST /data-export`, `DELETE /account`, and `POST /support-cases` with legal-hold and provider-owned-data limitations.",
    "Audit: `GET /audit-events` for user-visible sensitive activity where lawful, plus internal append-only logs for clinical, pharmacy, professional, and account events.",
  ];
}

function safetyBullets(app) {
  if (app.category === "Smart home") {
    return [
      "Treat real-world device control as safety-sensitive: doors, locks, alarms, cameras, thermostats, garage doors, and monitoring actions require server-side authorization and explicit state confirmation.",
      "Never expose live camera/audio, clip URLs, device credentials, Wi-Fi details, location history, or household membership in analytics, logs, crash reports, or support transcripts without redaction.",
      "Permission prompts must be just-in-time for camera QR scan, microphone talk, Bluetooth pairing, local network discovery, location/geofence, notifications, and photos/files export.",
      "Shared access must be scoped by home, room, device, feature, expiration, and role; revocation must invalidate local tokens and queued commands.",
      "Automation safety rules must block contradictory, repeated, irreversible, hazardous, or high-frequency commands and require a dry-run preview for risky actions.",
      "Camera/security events must include retention, download, deletion, and share rules; emergency or professional monitoring language must avoid implying verified dispatch behavior until legally integrated.",
    ];
  }

  return [
    "Treat health, pharmacy, patient, clinician, benefits, and professional data as sensitive; encrypt at rest and in transit and require device lock for cached views where appropriate.",
    "Do not provide diagnosis, prescribing, emergency triage, or clinical advice unless a separately reviewed licensed-provider workflow exists; urgent content must route to emergency guidance.",
    "Consent, proxy, caregiver, professional, and organization access must be explicit, auditable, revocable where lawful, and clearly separate from marketing preferences.",
    "Do not send PHI, raw health entries, prescription data, professional identifiers, payment details, precise location, or message contents as analytics properties.",
    "Provider-owned, payer-owned, pharmacy-owned, or organization-owned records may not be deletable or exportable solely by the clone; display limitations and request status honestly.",
    "Native permission prompts for notifications, camera/document scan, location/store search, HealthKit/fitness integrations, contacts, photos, and files must be just-in-time and have functional denial fallbacks.",
  ];
}

function spec(app) {
  return `# ${app.name}-Style Clone Spec

> Metadata
> - Inspiration app: ${app.name}
> - Category: ${app.category}
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of ${readinessDate}.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on ${readinessDate}; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: ${app.blockers}.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, or unlicensed integrations.

## Overview

Build an original mobile product inspired by ${app.name}'s public ${domain(app)} workflow. The V1 clone focuses on ${app.focus}.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs, app-specific risk boundaries are explicit, and unverified native, account, subscription, hardware, regional, and regulated behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first ${app.category.toLowerCase()} experience with onboarding, dashboard, primary workflow, alerts/reminders, settings, support, and recovery flows.
- Preserve the functional job behind ${app.name} while using original product naming, original UI, original sample data, and licensed integrations.
- Keep public-source evidence, inferred requirements, and blocked hands-on behavior visibly separate.
- Define screens, entities, API contracts, realtime/offline behavior, permissions, privacy/safety controls, analytics, tests, acceptance criteria, and implementation phases.
- Provide enough specificity for downstream implementation planning without claiming native one-for-one parity.

## Non-Goals

- Do not copy ${app.name} branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, plan names, UI trade dress, or protected media.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence for iOS, Android, account, subscription, push, and permission states.
- Do not control real devices, dispatch emergency services, process regulated health/pharmacy actions, or integrate paid/provider systems without separate legal, safety, and platform review.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
${sourceRows(app)}

## Detailed Design

- Onboarding must support guest education, signup, returning-user recovery, required consent, permission primers, and blocked-account states appropriate for ${app.category.toLowerCase()}.
- Home must default to a personalized dashboard with empty, loading, loaded, degraded-network, stale-data, signed-out, and permission-denied variants.
- The primary workflow must be reachable within two taps from home and must expose clear state transitions, recovery actions, and auditability for sensitive changes.
- Detail views must distinguish public-source verified behavior, inferred clone behavior, and unverified native behavior in requirements and test evidence.
- Settings must include profile, privacy, notifications, support, terms, privacy policy, data export, and account deletion entry points.
- Entitlements must model free, trial, paid, expired, canceled, restored, refunded, and unavailable states without copying plan names or pricing.
- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, reduced motion, captions/transcripts where relevant, and error text that does not rely on color alone.
- Offline behavior must preserve safe read-only context and recoverable drafts while blocking irreversible, regulated, hazardous, or unsafe writes until canonical server state is available.
- Manual blockers must remain launch-blocking until verified: ${app.blockers}.

## Core User Journeys

${appSpecificJourneys(app).map((item) => `- ${item}`).join("\n")}
- User opens settings, reviews privacy and terms links, changes notification/privacy preferences, starts data export, and requests deletion with clear constraints.
- User contacts support with app-specific context, receives a durable case state, and can see whether the issue is account, provider, device, billing, or regional.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
${screenRows(app)}

## Data Model

${dataModel(app).map((item) => `- ${item}`).join("\n")}

## API And Backend Contracts

${apiContracts(app).map((item) => `- ${item}`).join("\n")}
- Localization/config: \`GET /app-config\` returns feature flags, supported regions, legal links, copy keys, app minimum versions, and maintenance banners.
- Idempotency and audit: all sensitive writes require idempotency keys, actor IDs, device IDs, request IDs, conflict responses, and immutable audit events.

## Realtime, Push, And Offline Behavior

- Cache the home dashboard, recent detail pages, settings, entitlement state, and in-progress safe drafts with explicit TTL and stale-state labels.
- Realtime channels may use websocket, SSE, polling, or push-triggered refetch; clients must reconcile against canonical server state after missed events.
- Push notifications must be opt-in, grouped by category, mirrored in an in-app notification center where relevant, and deep-linked only after authorization checks.
- Queue only low-risk drafts locally; block money movement, regulated actions, emergency/dispatch claims, real-device hazardous commands, irreversible deletes, and unsafe submissions while offline.
- Long-running tasks must expose pending, complete, failed, canceled, expired, and support-escalated states.
- Background work must tolerate app termination, OS permission changes, token expiry, clock skew, duplicate events, and replayed webhooks.

## Permissions, Privacy, And Safety

${safetyBullets(app).map((item) => `- ${item}`).join("\n")}
- Provide user-visible privacy policy, terms, data export, delete-account, report/support, and account recovery flows from settings.
- Use original sample data and licensed third-party providers only after legal review.

## Analytics And Monetization

- Onboarding events: \`onboarding_started\`, \`permission_primer_viewed\`, \`signup_started\`, \`signup_completed\`, \`organization_or_home_selected\`, and \`onboarding_blocked\` with source, locale, and experiment IDs.
- Core action events: \`home_viewed\`, \`detail_opened\`, \`primary_action_started\`, \`primary_action_completed\`, \`primary_action_failed\`, and \`support_started\` with object type and coarse failure code only.
- Retention events: \`notification_opened\`, \`reminder_or_alert_configured\`, \`history_opened\`, \`share_started\`, \`offline_recovered\`, and \`settings_updated\`.
- Safety/privacy events: \`privacy_setting_changed\`, \`data_export_requested\`, \`account_delete_requested\`, \`access_grant_created\`, \`access_grant_revoked\`, and \`safety_block_shown\`.
- Monetization events: \`paywall_viewed\`, \`trial_started\`, \`purchase_started\`, \`purchase_completed\`, \`purchase_failed\`, \`subscription_canceled\`, \`entitlement_restored\`, and \`entitlement_expired\` where monetization is in scope.
- Monetization model: use original free/trial/paid entitlement logic; do not copy exact pricing, plan names, bundle names, promotional copy, or partner offers from ${app.name}.
- Analytics rule: do not send raw content, device credentials, precise location, camera/audio, PHI, pharmacy records, professional identifiers, payment credentials, private messages, or child data as event properties.

## Edge Cases

- First launch with no network, unsupported OS, expired session, revoked token, unsupported region, or maintenance banner.
- Permission denied, permission later revoked in OS settings, limited permission granted, and permission granted after fallback use.
- Duplicate taps, retry after timeout, duplicate webhook delivery, stale optimistic UI, conflict after reconnect, and clock skew.
- Deleted, suspended, blocked, expired, unavailable, region-locked, entitlement-locked, provider-owned, or hardware-unavailable objects.
- Partial upload/download, corrupt cache, disk full, app termination during background work, and push delivered before local cache is ready.
- Abuse/fraud: account takeover, invite abuse, overbroad sharing, support social engineering, false emergency claims, unsafe commands, and policy escalation.
- Subscription or benefit restored on a different platform, refunded externally, unavailable in region, or contradicted by server state.
- Legal/privacy request submitted while active devices, monitoring, pharmacy/care records, professional communications, bills, or support cases still exist.

## Test Plan

- Unit tests for validation, state machines, permission gates, entitlement checks, idempotency keys, and privacy-safe analytics payload construction.
- Integration tests for auth, onboarding, primary reads/writes, settings, support, notifications, entitlement transitions, data export, and account deletion.
- Contract tests for every documented API response shape, error code, pagination behavior, webhook event, and realtime reconciliation path.
- Offline tests for cached reads, stale labels, queued safe drafts, blocked unsafe writes, reconnect reconciliation, and corrupt-cache recovery.
- Permission tests for denied, granted, revoked, limited-access, and OS-settings recovery states.
- Safety/privacy tests for sensitive-data redaction, sharing/revocation, support escalation, audit events, and legal-link accessibility.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, media alternatives, and error text.
- Billing/entitlement tests for trial, purchase, renewal, cancellation, refund, expiration, restore, and unavailable states where applicable.
- Notification tests for opt-in, denied, revoked, quiet hours, category preferences, deep links, and in-app notification center behavior.
- Manual verification tests for ${app.blockers}.

## Acceptance Criteria

- The app can be implemented with original branding, copy, media, data, and integrations while preserving the documented functional workflow.
- All research-source rows use exact public URLs or explicit platform/provider blockers; no source-discovery placeholder remains.
- A new user can complete onboarding and reach the default dashboard without unsupported permissions.
- A returning user can complete the primary workflow, recover from network failure, and confirm canonical server state after reconnect.
- Dashboard, detail, primary action, alerts/reminders, sharing/access, settings, support, notifications, entitlement, and deletion/export flows are represented in routes and tests.
- All entities have owners, lifecycle states, authorization rules, retention, audit events, and deletion/export behavior.
- At least 10 acceptance tests cover happy path, empty state, permission denial, offline behavior, accessibility, support/safety, entitlement, notifications, data deletion/export, and regression behavior.
- Hands-on native parity remains blocked until the manual verification blockers listed in metadata have recorded lawful evidence.

## Open Questions

- Which exact iOS and Android native screens, permission prompts, and push payloads differ materially from public marketplace claims?
- Which account, subscription, provider, device, hardware, organization, region, or eligibility states require paid or physical test access?
- Which third-party providers will supply identity, payments, notifications, analytics, maps, device cloud, health/pharmacy, storage, media, or support services for the original clone?
- Which features are intentionally out of scope for legal, safety, budget, provider-contract, or platform-policy reasons?
- What retention, export, and deletion limits apply to provider-owned, device-owned, health/pharmacy, billing, monitoring, support, or audit records?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, analytics schema, and seed-data policy.
- Phase 2: Build onboarding, dashboard, detail, primary workflow, settings, support, and entitlement shells with original copy and sample data.
- Phase 3: Add backend contracts, audit logging, offline/retry handling, notification preferences, access/sharing controls, and data export/delete flows.
- Phase 4: Add app-specific safety controls for ${app.focus}.
- Phase 5: Complete accessibility, privacy, safety, entitlement, permission, offline, notification, and regression tests.
- Phase 6: Conduct lawful hands-on native verification and resolve manual blockers before claiming one-for-one parity.

## Next Steps

- Capture native iOS and Android screen evidence for onboarding, dashboard, primary workflows, settings, permissions, notifications, subscription/benefit states, and account deletion.
- Record app-specific account, hardware, provider, subscription, region, and support blockers in a dedicated research note without committing proprietary screenshots or media.
- Confirm legal/privacy retention behavior for ${app.name}-style sensitive records and update API contracts before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
`;
}

for (const app of apps) {
  const file = path.join("specs", "batch-33", `${app.id}-${app.slug}.md`);
  fs.writeFileSync(file, spec(app));
  console.log(`wrote ${file}`);
}
