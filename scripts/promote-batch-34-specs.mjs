import fs from "node:fs";
import path from "node:path";

const readinessDate = "2026-05-05";

const apps = [
  {
    id: 661,
    slug: "express-scripts",
    name: "Express Scripts",
    focus: "pharmacy benefit onboarding, prescription dashboard, refill and renew flows, order status, preferred pharmacy lookup, paperless documents, coverage checks, and member-plan eligibility",
    blockers: "prescription-benefit eligibility, pharmacy account linking, refill authority, mail-order fulfillment, benefit pricing, medication substitutions, member ID verification, notifications, and plan-specific regional availability",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/express-scripts/id442464896", "iOS listing, privacy labels, release notes, and support/developer links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.medco.medcopharmacy", "Android listing, data safety, install requirements, release notes, and support links"],
      ["Official product site", "https://www.express-scripts.com/mobile-app", "Mobile app feature overview, benefit eligibility, prescriptions, orders, and pharmacy lookup"],
      ["Official support", "https://www.express-scripts.com/frequently-asked-questions", "Account, prescription, order, benefit, pharmacy, and paperless-document help"],
      ["Privacy policy", "https://www.express-scripts.com/privacy", "Prescription, account, benefit, communication, analytics, and sharing disclosures"],
      ["Terms", "https://www.express-scripts.com/terms-of-use", "Website/app terms, account, benefit, content, and service boundaries"],
    ],
  },
  {
    id: 662,
    slug: "amwell",
    name: "Amwell",
    focus: "telehealth registration, visit-type selection, provider matching, scheduled and on-demand visits, intake forms, video waiting room, payments, prescriptions, and post-visit summaries",
    blockers: "state licensure, insurance pricing, provider availability, clinical intake, video reliability, prescribing limits, urgent-care disclaimers, behavioral health eligibility, and support refund outcomes",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/amwell-doctor-visits-24-7/id655783752", "iOS listing, privacy labels, release notes, category, and support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.americanwell.android.member.amwell", "Android listing, data safety, visit claims, pricing claims, and support links"],
      ["Official product site", "https://patients.amwell.com/", "Patient telehealth service scope, visits, insurance, pricing, and care categories"],
      ["Official support", "https://patients.amwell.com/faq/", "Account, visit, payment, insurance, prescription, video, and technical support FAQ"],
      ["Privacy policy", "https://business.amwell.com/privacy-policy/", "Patient, account, visit, payment, analytics, and sharing disclosures"],
      ["Terms", "https://patients.amwell.com/terms-of-use/", "Patient terms, telehealth limits, accounts, content, payment, and service boundaries"],
    ],
  },
  {
    id: 663,
    slug: "mdlive",
    name: "MDLIVE",
    focus: "virtual urgent care, behavioral health, dermatology, provider scheduling, on-demand queue, visit intake, video consultation, prescriptions, medical-device data sharing, and post-visit records",
    blockers: "state regulations, insurance eligibility, prescription restrictions, controlled-substance exclusions, appointment availability, video quality, device data import, behavioral health policies, and clinical support outcomes",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/mdlive/id839671393", "iOS listing, privacy labels, release notes, medical category, and support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.mdlive.mobile", "Android listing, data safety, release notes, and support links"],
      ["Official product site", "https://www.mdlive.com/", "Telehealth categories, urgent care, behavioral health, dermatology, and visit flow"],
      ["Official support", "https://www.mdlive.com/faqs/", "Account, visits, insurance, prescriptions, payments, and technical support"],
      ["Privacy policy", "https://www.mdlive.com/privacy-policy/", "Health, visit, account, payment, communication, and analytics disclosures"],
      ["Terms", "https://www.mdlive.com/terms-of-use/", "Telehealth terms, prescribing limits, emergencies, account, and service boundaries"],
    ],
  },
  {
    id: 664,
    slug: "doctor-on-demand",
    name: "Doctor On Demand",
    focus: "Included Health telehealth onboarding, urgent care, therapy, psychiatry, insurance/self-pay pricing, provider selection, video visits, treatment plans, prescriptions, and doctor notes",
    blockers: "coverage eligibility, self-pay pricing, clinical intake, mental-health scheduling, prescribing limits, doctor-note issuance, video reliability, pharmacy routing, and support credits/refunds",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/doctor-on-demand/id591981144", "iOS listing, privacy labels, release notes, care categories, and support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.doctorondemand.android.patient", "Android listing, data safety, install requirements, and feature claims"],
      ["Official product site", "https://doctorondemand.com/", "Telehealth service overview, urgent care, mental health, insurance, and pricing positioning"],
      ["Official support", "https://support.doctorondemand.com/", "Account, visits, payments, prescriptions, insurance, and technical support docs"],
      ["Privacy policy", "https://www.includedhealth.com/privacy/", "Included Health privacy disclosures for health, account, visit, payment, and analytics data"],
      ["Terms", "https://www.includedhealth.com/terms-of-use/", "Service terms, telehealth limits, account, payment, and clinical boundaries"],
    ],
  },
  {
    id: 665,
    slug: "healthtap",
    name: "HealthTap",
    focus: "online primary care, AI/symptom guidance boundaries, same-day appointments, dedicated doctor relationships, membership gates, lab/prescription workflows, Q&A content, and care-plan follow-up",
    blockers: "medical-provider availability, membership pricing, AI guidance limits, prescription/lab ordering, minor accounts, state licensure, clinical messaging, and emergency disclaimers",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/healthtap-primary-care-doctors/id466079030", "iOS patient listing, privacy labels, release notes, and care claims"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.healthtap.userhtexpress", "Android listing, data safety, membership claims, and support links"],
      ["Official product site", "https://www.healthtap.com/", "Primary care, telehealth, membership, doctor, and health information positioning"],
      ["Official help", "https://support.healthtap.com/", "Account, visits, memberships, billing, prescriptions, and support docs"],
      ["Privacy policy", "https://www.healthtap.com/privacy/", "Health, account, search, provider, analytics, and sharing disclosures"],
      ["Terms", "https://www.healthtap.com/terms/", "Patient terms, medical-service limits, age rules, account, billing, and emergency boundaries"],
    ],
  },
  {
    id: 666,
    slug: "one-medical",
    name: "One Medical",
    focus: "membership-based primary care, appointment scheduling, Treat Me Now, urgent video chat, secure provider messaging, prescription renewals, health records, bills, insurance, office search, and Apple Health sync",
    blockers: "membership eligibility, Amazon/One Medical account states, office markets, insurance billing, provider messaging, prescription renewals, child/family account handling, Apple Health sync, and urgent-care availability",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/one-medical/id393507802", "iOS listing, privacy labels, release notes, membership language, and support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.onemedical.android", "Android listing, data safety, feature claims, and support links"],
      ["Official product site", "https://www.onemedical.com/", "Membership, primary care, virtual care, offices, benefits, and service model"],
      ["Official help", "https://www.onemedical.com/help/", "Membership, account, appointments, billing, insurance, records, and support docs"],
      ["Privacy policy", "https://www.onemedical.com/privacy-policy/", "Health, account, payment, insurance, location, analytics, and sharing disclosures"],
      ["Terms", "https://www.onemedical.com/terms-of-use/", "Membership terms, accounts, care limits, billing, and service boundaries"],
    ],
  },
  {
    id: 667,
    slug: "carbon-health",
    name: "Carbon Health",
    focus: "hybrid urgent/primary care onboarding, appointment booking, clinic search, telehealth, labs, prescriptions, records, messaging, billing, and care-plan follow-up",
    blockers: "clinic/service availability, insurance eligibility, telehealth states, lab ordering/results, prescription authority, billing/refund outcomes, provider messaging, and market-specific support paths",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/carbon-health/id1152807572", "iOS listing, privacy labels, release notes, and support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.carbonhealth.patient", "Android listing, data safety, install requirements, and support links"],
      ["Official product site", "https://carbonhealth.com/", "Urgent care, primary care, virtual care, locations, insurance, and service model"],
      ["Official support", "https://support.carbonhealth.com/", "Account, appointments, billing, insurance, labs, records, and support docs"],
      ["Privacy policy", "https://carbonhealth.com/privacy-policy", "Health, account, payment, insurance, location, communication, and analytics disclosures"],
      ["Terms", "https://carbonhealth.com/terms-of-use", "Service terms, care boundaries, accounts, payments, and acceptable-use terms"],
    ],
  },
  {
    id: 668,
    slug: "nurx",
    name: "Nurx",
    focus: "Thirty Madison reproductive/sexual health onboarding, eligibility intake, birth control, emergency contraception, STI testing, dermatology, migraine, messaging, pharmacy fulfillment, and insurance/self-pay routing",
    blockers: "state availability, age eligibility, clinician review, prescription authority, lab-kit logistics, pharmacy fulfillment, insurance coverage, sensitive reproductive-health privacy, and urgent-symptom escalation",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/nurx-birth-control-delivered/id1213141301", "iOS listing, privacy labels, release notes, and care-category claims"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.nurx", "Android listing, data safety, install requirements, and support links"],
      ["Official product site", "https://www.nurx.com/", "Care categories, prescriptions, lab testing, clinician review, delivery, and eligibility"],
      ["Official support", "https://www.nurx.com/faq/", "Account, insurance, prescriptions, lab tests, delivery, billing, and support FAQ"],
      ["Privacy policy", "https://www.nurx.com/privacy-policy/", "Reproductive, sexual-health, prescription, account, payment, and analytics disclosures"],
      ["Terms", "https://www.nurx.com/terms-of-use/", "Service terms, clinical limits, prescriptions, labs, account, payment, and emergency boundaries"],
    ],
  },
  {
    id: 669,
    slug: "maven-clinic",
    name: "Maven Clinic",
    focus: "women and family virtual clinic onboarding, sponsored benefit activation, fertility/pregnancy/parenting/menopause care journeys, provider messaging/video, care advocate, classes, articles, and health binder",
    blockers: "employer/health-plan sponsorship, pay-as-you-go availability, specialist availability, reproductive-health privacy, care advocate routing, prescriptions, benefits referrals, and international/regional care limits",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/maven-clinic/id942543121", "iOS listing, privacy labels, release notes, care categories, and support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.mavenclinic.android.member", "Android listing, data safety, device-security requirements, and support links"],
      ["Official product site", "https://www.mavenclinic.com/", "Family health, fertility, maternity, parenting, menopause, benefits, and virtual-care positioning"],
      ["Official support", "https://support.mavenclinic.com/", "Account, benefits, appointments, providers, billing, and technical support"],
      ["Privacy policy", "https://www.mavenclinic.com/privacy-policy", "Health, reproductive, family, account, employer/plan, analytics, and sharing disclosures"],
      ["Terms", "https://www.mavenclinic.com/terms", "Service terms, clinical limits, account, benefits, content, and payment boundaries"],
    ],
  },
  {
    id: 670,
    slug: "noom",
    name: "Noom",
    focus: "behavior-change onboarding, weight and health goals, food logging with AI/photo/barcode/text, lessons, coaching, step tracking, GLP-1 eligibility gates, body scans, subscriptions, and progress insights",
    blockers: "subscription plans, medication eligibility, coaching scope, AI food logging accuracy, body-scan privacy, eating-disorder safety, device sync, ad tracking, and refund/cancellation behavior",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/noom-weight-loss-food-tracker/id634598719", "iOS listing, privacy labels, release notes, in-app purchases, and support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.wsl.noom", "Android listing, data safety, subscription/medication claims, and support links"],
      ["Official product site", "https://www.noom.com/", "Behavior change, food logging, coaching, medication, movement, and subscription positioning"],
      ["Official support", "https://support.noom.com/", "Account, subscription, billing, coaching, food logging, medication, and technical support"],
      ["Privacy policy", "https://www.noom.com/privacy-policy/", "Health, weight, food, payment, location, advertising, analytics, and sharing disclosures"],
      ["Terms", "https://www.noom.com/terms-and-conditions-of-use/", "Subscription, content, coaching, medication, account, and acceptable-use boundaries"],
    ],
  },
  {
    id: 671,
    slug: "lose-it",
    name: "Lose It!",
    focus: "calorie and macro goals, food barcode/photo/search logging, intermittent fasting, weight trends, exercise sync, recipes, insights, community/challenges, Premium gates, and nutrition-safety disclaimers",
    blockers: "nutrition database accuracy, barcode/photo recognition, subscription restore, weight-loss safety, eating-disorder screening, ad tracking, device sync, community moderation, and data export behavior",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/lose-it-calorie-counter/id297368629", "iOS listing, privacy labels, release notes, in-app purchases, and support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.fitnow.loseit", "Android listing, data safety, feature claims, and support links"],
      ["Official product site", "https://www.loseit.com/", "Food logging, weight goals, Premium, integrations, and nutrition tracking positioning"],
      ["Official support", "https://help.loseit.com/", "Account, logging, subscription, devices, billing, privacy, and support docs"],
      ["Privacy policy", "https://www.loseit.com/privacy/", "Health, food, weight, account, advertising, analytics, and sharing disclosures"],
      ["Terms", "https://www.loseit.com/terms/", "Service terms, subscriptions, content, account, community, and acceptable-use boundaries"],
    ],
  },
  {
    id: 672,
    slug: "cronometer",
    name: "Cronometer",
    focus: "verified food database logging, nutrient/micronutrient dashboards, diary groups, fasting timer, recipe importer, macro scheduler, device imports, sleep correlations, and Gold subscription gates",
    blockers: "nutrition database licensing, barcode/food verification, device integrations, Gold entitlement restore, professional nutrition claims, fasting safety, custom biomarkers, and data export/import formats",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/cronometer-calorie-counter/id1145935738", "iOS listing, privacy labels, release notes, subscription claims, and support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.cronometer.android.gold", "Android listing, data safety, in-app purchases, and support links"],
      ["Official product site", "https://cronometer.com/", "Nutrition diary, verified foods, integrations, Gold, professional positioning, and feature scope"],
      ["Official support", "https://support.cronometer.com/", "Account, diary, foods, devices, subscriptions, privacy, and support docs"],
      ["Privacy policy", "https://cronometer.com/privacy/", "Nutrition, health, account, device, payment, advertising, and analytics disclosures"],
      ["Terms", "https://cronometer.com/terms/", "Service terms, nutrition content, subscriptions, accounts, and acceptable-use boundaries"],
    ],
  },
  {
    id: 673,
    slug: "lifesum",
    name: "Lifesum",
    focus: "AI/photo/voice/text/barcode meal logging, calorie and macro tracking, water and produce goals, meal plans, recipes, Life Score, fitness sync, and Premium nutrition plans",
    blockers: "AI logging accuracy, nutrition database licensing, subscription pricing, diet-plan medical safety, fitness sync, eating-disorder risk, ad tracking, and international legal terms",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/lifesum-ai-calorie-counter/id286906691", "iOS listing, privacy labels, release notes, in-app purchases, and support links"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.sillens.shapeupclub", "Android listing, data safety, feature claims, and support links"],
      ["Official product site", "https://lifesum.com/", "Nutrition tracking, meal plans, AI logging, Life Score, recipes, and Premium positioning"],
      ["Official support", "https://support.lifesum.com/", "Account, subscriptions, logging, devices, data, and support docs"],
      ["Privacy and terms", "https://api.lifesum.com/mobile-terms", "Mobile terms and privacy disclosures linked from public app listing"],
      ["Cookie policy", "https://lifesum.com/cookie-policy", "Tracking, advertising, analytics, and consent disclosures"],
    ],
  },
  {
    id: 674,
    slug: "waterminder",
    name: "WaterMinder",
    focus: "hydration goal setup, water/drink logging, smart reminders, visual fill progress, custom cups, history charts, HealthKit read/write, widgets, watch support, and Premium gates",
    blockers: "HealthKit permission behavior, hydration-estimate safety, reminder scheduling, widget/watch sync, subscription restore, unit conversions, drink database customization, and no-medical-advice copy",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/water-tracker-by-waterminder/id653031147", "iOS listing, privacy labels, accessibility claims, in-app purchases, and HealthKit note"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.funnmedia.waterminder", "Android listing, data safety, feature claims, and support links"],
      ["Official product site", "https://waterminder.com/", "Hydration tracking, reminders, widgets, watch support, and Premium positioning"],
      ["Official support", "https://waterminder.com/support.html", "Setup, reminders, sync, subscriptions, and app support"],
      ["Privacy policy", "https://www.iubenda.com/privacy-policy/7803420", "App privacy disclosures linked from public listing"],
      ["Terms", "https://waterminder.com/terms.html", "Terms, subscriptions, app use, and support boundaries"],
    ],
  },
  {
    id: 675,
    slug: "pillow",
    name: "Pillow",
    focus: "sleep tracking with Apple Watch/iPhone/iPad, sleep stages, smart alarm, snore/sleep audio recording, insights, sleep aid library, mood/notes, trends, Apple Health comparison, and Premium gates",
    blockers: "Apple Health permissions, microphone/audio recording consent, on-device sleep/audio analysis claims, subscription restore, watch sync, alarm reliability, sleep-apnea disclaimer, and CSV export behavior",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/pillow-sleep-tracker/id878691772", "iOS listing, privacy labels, accessibility claims, subscription details, and feature claims"],
      ["Google Play", "Platform blocker: no verified first-party Google Play listing for Pillow Sleep Tracker", "Android parity is blocked until a first-party listing is verified"],
      ["Official product site", "https://pillow.app/", "Sleep tracking, smart alarm, audio, insights, Apple Health, and Premium positioning"],
      ["Official support", "https://support.pillow.app/", "Setup, Apple Watch, audio, subscriptions, export, privacy, and support docs"],
      ["Privacy policy", "https://pillow.app/pillow-privacy-policy-en", "Privacy and data handling disclosures linked from public listing"],
      ["Terms", "https://pillow.app/pillow-privacy-policy-en", "Terms/subscription/privacy text linked from public app listing"],
    ],
  },
  {
    id: 676,
    slug: "autosleep",
    name: "AutoSleep",
    focus: "Apple Watch automatic sleep detection, sleep rings, sleep stages integration, readiness, trends, history, privacy-first local processing, companion watch app, and one-time paid entitlement",
    blockers: "Apple Watch hardware, HealthKit sleep-stage access, sensor accuracy, no-data-collection claim, paid App Store purchase, companion apps, alarm behavior through adjacent apps, and no Android parity",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/autosleep-watch-sleep-tracker/id1164801111", "iOS listing, privacy labels, purchase model, and feature claims"],
      ["Google Play", "Platform blocker: no verified first-party Google Play listing for AutoSleep Watch Sleep Tracker", "Android parity is blocked until a first-party listing is verified"],
      ["Official product site", "https://autosleepapp.tantsissa.com/", "Sleep tracking, Apple Watch, privacy, metrics, and product positioning"],
      ["Official support", "https://autosleepapp.tantsissa.com/support", "Setup, Apple Watch, HealthKit, troubleshooting, and support docs"],
      ["Privacy policy", "https://autosleepapp.tantsissa.com/privacy", "Privacy, local processing, data collection, HealthKit, and analytics disclosures"],
      ["Terms", "https://autosleepapp.tantsissa.com/terms", "Terms, app purchase, support, and service boundaries"],
    ],
  },
  {
    id: 677,
    slug: "sleepscore",
    name: "SleepScore",
    focus: "phone-based sleep tracking, sonar/device compatibility, sleep score, sleep stages, smart alarm, science-backed insights, doctor report, subscriptions, and sleep-improvement programs",
    blockers: "supported phone list, sonar tracking accuracy, subscription restore, doctor-report export, sleep-health claims, microphone/sensor permissions, no-emergency/diagnosis copy, and iOS availability verification",
    sources: [
      ["Apple App Store", "Platform blocker: no verified active first-party US App Store listing for SleepScore", "iOS parity is blocked until a first-party listing is verified"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.sleepscore.drive", "Android listing, data safety, sonar compatibility, subscription claims, and support links"],
      ["Official product site", "https://www.sleepscore.com/", "Sleep tracking, insights, reports, app compatibility, and science positioning"],
      ["Official support", "https://www.sleepscore.com/help/", "Setup, compatibility, subscriptions, reports, and troubleshooting support"],
      ["Privacy policy", "https://www.sleepscore.com/legal/privacy-policy", "Sleep, account, device, sensor, analytics, and sharing disclosures"],
      ["Terms", "https://www.sleepscore.com/legal/sleepscore-terms-of-service", "Terms, subscriptions, app use, medical disclaimers, and service boundaries"],
    ],
  },
  {
    id: 678,
    slug: "withings-health-mate",
    name: "Withings Health Mate",
    focus: "Withings App dashboards, device setup, weight/body composition, activity, sleep, blood pressure, ECG/cardio services, cycle tracking, multiple profiles, reports, doctor sharing, and Withings+ gates",
    blockers: "device pairing, clinical-grade device claims, ECG cardiologist reviews, U-Scan/BPM hardware, family profiles, Apple Health sync, subscription entitlements, location permissions, and regional medical compliance",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/withings-health-mate/id542701020", "iOS listing, privacy labels, release notes, in-app purchases, and device claims"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.withings.wiscale2", "Android listing, data safety, device support, and release claims"],
      ["Official product site", "https://www.withings.com/", "Health devices, app, Withings+, cardiology services, reports, and product positioning"],
      ["Official support", "https://support.withings.com/", "Device setup, app sync, subscriptions, medical services, and troubleshooting docs"],
      ["Privacy policy", "https://www.withings.com/legal/privacy-policy", "Health, device, account, location, medical service, analytics, and sharing disclosures"],
      ["Terms", "https://www.withings.com/legal/terms-and-conditions", "Service, device, subscription, medical-compliance, and account terms"],
    ],
  },
  {
    id: 679,
    slug: "samsung-health",
    name: "Samsung Health",
    focus: "activity, sleep, nutrition, cycle, wellness, health records, Galaxy wearable sync, challenges, health insights, coaching, permissions, and cross-device account controls",
    blockers: "Galaxy device/watch feature differences, Health Connect permissions, iOS feature gaps, regional health-record availability, Samsung account behavior, challenges/community moderation, and sensor accuracy",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/samsung-health/id1224541484", "iOS listing, privacy labels, compatibility, and feature limitations"],
      ["Google Play", "https://play.google.com/store/apps/details?id=com.sec.android.app.shealth", "Android listing, data safety, Galaxy integration, and feature claims"],
      ["Official product site", "https://www.samsung.com/us/apps/samsung-health/", "Samsung Health features, wearables, wellness, coaching, and account positioning"],
      ["Official support", "https://www.samsung.com/us/support/apps-services/samsung-health/", "Setup, wearable sync, permissions, data, account, and troubleshooting docs"],
      ["Privacy policy", "https://www.samsung.com/us/account/privacy-policy/", "Samsung account, health, device, location, analytics, and sharing disclosures"],
      ["Terms", "https://account.samsung.com/membership/terms", "Samsung account and service terms, content, region, and acceptable-use boundaries"],
    ],
  },
  {
    id: 680,
    slug: "apple-health",
    name: "Apple Health",
    focus: "centralized Health app records, charts, trends, sleep, cycle tracking, medications, mental wellbeing, health sharing, emergency/medical ID, connected devices, third-party app permissions, and privacy controls",
    blockers: "iOS/iPadOS system app behavior, HealthKit entitlements, Apple Watch/device data, medication reminders, health sharing invitations, medical records provider integration, emergency access, and no first-party Android parity",
    sources: [
      ["Apple App Store", "https://apps.apple.com/us/app/apple-health/id1242545199", "iOS/iPadOS listing, privacy labels, feature overview, and compatibility"],
      ["Google Play", "Platform blocker: no first-party Google Play listing for Apple Health", "Android parity is blocked because Apple Health is an Apple platform app"],
      ["Official product site", "https://www.apple.com/ios/health/", "Health app features, privacy positioning, sharing, records, medications, and Apple Watch/device scope"],
      ["Official support", "https://support.apple.com/guide/iphone/health-iphc5e5aeea3/ios", "Health app setup, data, sharing, sources, records, and permissions docs"],
      ["Privacy policy", "https://www.apple.com/legal/privacy/en-ww/", "Apple privacy disclosures for health, device, account, analytics, and sharing"],
      ["Terms", "https://www.apple.com/legal/internet-services/terms/site.html", "Apple site/service terms and legal boundaries"],
    ],
  },
];

const screens = [
  ["Welcome/Auth", "Account entry, identity proofing, eligibility, and consent", "email, password, SSO, member id, invite, device state", "new, returning, verified, pending, locked", "MFA required, unsupported region, expired invite, account mismatch"],
  ["Profile/Eligibility", "Patient, member, caregiver, clinician, or wellness profile and eligibility", "forms, cards, plan data, demographic edits", "draft, active, pending, rejected, expired", "name mismatch, plan unavailable, sponsor missing"],
  ["Home/Dashboard", "Personalized summary of care, medication, nutrition, sleep, device, or wellness state", "taps, pull refresh, filters, deep links", "empty, loading, current, attention, stale", "provider outage, device missing, consent missing"],
  ["Primary Flow", "Refill, appointment, visit, message, log, sync, record, or care action", "forms, scans, provider, food, device, payment, date/time", "draft, submitted, confirmed, completed", "unsafe request, unavailable provider, invalid reading"],
  ["Records/History", "Medication, clinical, nutrition, sleep, activity, device, or visit history", "filter, open, export, share", "empty, loaded, sensitive, delayed, exported", "withheld data, stale device sync, provider-owned record"],
  ["Messages/Support", "Secure messages, support cases, care team contact, or technical help", "compose, reply, category, attachment", "unread, sent, pending, escalated", "urgent content warning, delivery failure, support backlog"],
  ["Reminders/Notifications", "Medication, appointment, hydration, sleep, logging, order, or wellness reminders", "toggles, schedule, quiet hours, category", "enabled, paused, missed, completed", "push denied, duplicate reminder, time-zone skew"],
  ["Search/Directory", "Provider, pharmacy, clinic, food, device, article, program, or location search", "query, filters, location, barcode, scan", "empty, results, selected, unavailable", "stale directory, unsupported barcode, out-of-network"],
  ["Payments/Benefits", "Bills, copays, insurance, benefits, subscriptions, rewards, or paid app entitlement", "card, wallet, receipt, plan, restore", "eligible, active, denied, paid, refunded", "price mismatch, benefit unavailable, refund pending"],
  ["Settings/Privacy", "Account, consent, app permissions, data rights, terms, privacy, export, deletion", "forms, toggles, links, request", "loaded, editing, exported, deleting", "legal hold, provider-owned data, active subscription"],
];

function sourceRows(app) {
  return app.sources
    .map(([source, url, evidence]) => `| ${source} | ${url} | ${evidence} | Verified public URL or explicit platform blocker on ${readinessDate}; hands-on native behavior still blocked. |`)
    .join("\n");
}

function screenRows() {
  return screens.map((row) => `| ${row.join(" | ")} |`).join("\n");
}

function bullets(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function spec(app) {
  return `# ${app.name}-Style Clone Spec

> Metadata
> - Inspiration app: ${app.name}
> - Category: Health and medical
> - Readiness status: Implementation-ready for a lawful public-source V1 clone as of ${readinessDate}.
> - Verification basis: exact public marketplace, official product/help, privacy, and terms URLs captured on ${readinessDate}; hands-on native evidence is still required before one-for-one parity claims.
> - Manual verification blockers: ${app.blockers}.
> - Legal scope: functional parity only; do not use original code, brand, copy, iconography, screenshots, media, private APIs, proprietary datasets, regulated provider contracts, or unlicensed integrations.

## Overview

Build an original mobile product inspired by ${app.name}'s public health and medical workflow. The V1 clone focuses on ${app.focus}.

This spec is implementation-ready for a lawful public-source V1 because source-discovery placeholders have been replaced with exact public URLs or explicit platform blockers, app-specific privacy/safety boundaries are explicit, and unverified native, account, eligibility, provider, device, subscription, regional, and regulated behaviors remain blocked until hands-on evidence is captured.

## Goals

- Deliver a mobile-first health and medical experience with consent-based onboarding, dashboard, primary care or tracking flow, reminders, records/export, privacy controls, support, and recovery flows.
- Preserve the functional job behind ${app.name} while using original product naming, original UI, original sample data, and licensed integrations.
- Keep public-source evidence, inferred requirements, and blocked hands-on behavior visibly separate.
- Define screens, entities, API contracts, realtime/offline behavior, permissions, privacy/safety controls, analytics, tests, acceptance criteria, and implementation phases.
- Provide enough specificity for downstream implementation planning without claiming native one-for-one parity or regulated clinical correctness.

## Non-Goals

- Do not copy ${app.name} branding, logos, screenshots, marketing copy, private APIs, proprietary datasets, plan names, UI trade dress, clinical content, nutrition databases, provider directories, or protected media.
- Do not claim exact native behavior until a lawful hands-on verification pass records evidence for iOS, Android, account, eligibility, provider, subscription, push, and permission states.
- Do not provide diagnosis, prescribing, emergency triage, regulated medical-device interpretation, medication administration guidance, or clinical advice without separately reviewed licensed-provider workflows.
- Do not build runtime app code in this spec repository.

## Research Sources

| Source | URL | Evidence To Verify | Status |
|---|---|---|---|
${sourceRows(app)}

## Detailed Design

- Onboarding must support guest education where lawful, signup, returning-user recovery, identity/eligibility checks, consent capture, permission primers, and blocked-account states.
- Home must default to a personalized dashboard with empty, loading, loaded, degraded-network, stale-data, signed-out, consent-missing, and permission-denied variants.
- The primary workflow must be reachable within two taps from home and must expose clear state transitions, recovery actions, and auditability for sensitive changes.
- Detail views must show provenance, freshness, release status, source, and limitations for care, pharmacy, nutrition, sleep, device, or wellness data.
- Settings must include profile, privacy, notifications, support, terms, privacy policy, data export, and account deletion entry points.
- Entitlements must model free, trial, paid, expired, canceled, restored, refunded, sponsored, employer/plan eligible, and unavailable states without copying plan names or pricing.
- Accessibility must support dynamic type, screen reader labels, visible focus, contrast, reduced motion, captions/transcripts where relevant, and error text that does not rely on color alone.
- Offline behavior must preserve safe read-only context and recoverable drafts while blocking regulated, clinical, paid, provider-owned, hazardous, or irreversible writes until canonical server state is available.
- Manual blockers must remain launch-blocking until verified: ${app.blockers}.

## Core User Journeys

- User creates or restores a ${app.name}-style account, completes consent and eligibility checks, and reaches a privacy-forward dashboard.
- User reviews a medication, visit, message, nutrition entry, sleep/activity metric, device reading, or health record with source/provenance and limitations clearly labeled.
- User starts the primary care, pharmacy, tracking, device-sync, appointment, payment, or support request; safety disclaimers appear before submission; the request receives a durable status.
- User edits notification/reminder preferences and sees the difference between transactional, care-critical, marketing, and optional wellness messages.
- User exports records or requests account/data deletion, sees provider-owned/legal-hold limitations, and receives an auditable request state.
- User attempts an urgent or clinically unsafe action and is routed to emergency disclaimers, support escalation, or provider-owned channels rather than generic app completion.
- User loses connectivity, sees cached state labeled as stale, can inspect allowed history, and cannot submit unsafe or regulated requests until reconnected.
- User contacts support with app-specific context, receives a durable case state, and can distinguish account, clinical, benefit, subscription, device, billing, or regional issues.

## Screen Inventory

| Screen | Purpose | Primary Inputs | Required States | Failure And Edge States |
|---|---|---|---|---|
${screenRows()}

## Data Model

${bullets([
  "User: account, identity-verification status, consent, locale, accessibility, communication preferences, deletion/export status, and support state.",
  "Profile: patient, member, caregiver, clinician, wellness, device-owner, or professional role with eligibility, organization, and verification metadata.",
  "CareRelationship: provider, clinic, pharmacy, plan, employer, device ecosystem, professional network, or benefit relationship with scope and expiry.",
  "HealthRecord: clinical, pharmacy, nutrition, sleep, activity, device, benefits, appointment, message, order, or wellness record with provenance and release status.",
  "Request: refill, appointment, telehealth visit, message, prescription, lab, food log, device sync, subscription, export, bill, or support request with validation and queue state.",
  "ConsentGrant: sharing, proxy, caregiver, professional, provider, marketing, notification, data export, research, HealthKit/Health Connect, or integration consent with revocation audit.",
  "Reminder: medication, appointment, refill, hydration, meal, sleep, weight, activity, benefit, wellness, or professional task reminder with quiet hours and delivery history.",
  "PaymentOrBenefit: copay, bill, card, subscription, paid app purchase, employer sponsorship, insurance eligibility, benefit card, claim, refund, or restore state.",
  "DirectoryEntry: provider, pharmacy, clinic, food, device, article, program, service, or organization listing with freshness and availability metadata.",
  "AuditEvent: sensitive reads/writes, identity checks, proxy changes, provider requests, exports, account deletion, support escalation, billing, and regulatory events.",
  "LocalCacheRecord: encrypted offline summary cache with TTL, redaction policy, retry state, stale-source label, and device-lock requirements.",
])}

## API And Backend Contracts

${bullets([
  "Auth/identity: POST /auth/session, POST /auth/mfa, POST /identity/verify, POST /eligibility/check, and POST /proxy/accept with audit metadata.",
  "Profile/eligibility: GET /profile, PATCH /profile, GET /eligibility, and organization/provider/plan-scoped entitlement responses.",
  "Records: GET /records, GET /records/{recordId}, POST /records/export, and release-status metadata for provider-owned, device-owned, or delayed records.",
  "Requests: POST /requests, GET /requests/{requestId}, PATCH /requests/{requestId}, and type-specific validation for appointment, refill, visit, log, sync, bill, or support workflows.",
  "Messaging/reminders: GET /messages, POST /messages, POST /reminders, and transactional push categories that distinguish urgent, clinical, marketing, and optional wellness content.",
  "Directory/search: GET /directory with specialty, service, location, food, device, organization, and benefit filters plus cache freshness and availability disclaimers.",
  "Payments/benefits: GET /payments, POST /payments/session, GET /benefits, POST /entitlements/restore, and immutable receipt/claim metadata without storing raw card or regulated identifiers in the client.",
  "Device/integrations: GET /integrations, POST /integrations/connect, DELETE /integrations/{id}, and permission-scoped imports from HealthKit, Health Connect, wearables, pharmacy, provider, or nutrition systems.",
  "Privacy/support: GET /privacy/settings, PATCH /privacy/settings, POST /data-export, DELETE /account, and POST /support-cases with legal-hold and provider-owned-data limitations.",
  "Audit/config: GET /audit-events for user-visible sensitive activity where lawful; GET /app-config returns feature flags, supported regions, legal links, copy keys, minimum versions, and maintenance banners.",
])}

## Realtime, Push, And Offline Behavior

- Cache the dashboard, recent detail pages, settings, entitlement state, and in-progress safe drafts with explicit TTL and stale-state labels.
- Realtime channels may use websocket, SSE, polling, device-sync callbacks, or push-triggered refetch; clients must reconcile against canonical server state after missed events.
- Push notifications must be opt-in, grouped by category, mirrored in an in-app notification center where relevant, and deep-linked only after authorization checks.
- Queue only low-risk drafts locally; block regulated care requests, medication/refill actions, paid transactions, clinical submissions, device-derived medical claims, irreversible deletes, and unsafe requests while offline.
- Long-running tasks must expose pending, complete, failed, canceled, expired, provider-review, benefit-review, and support-escalated states.
- Background work must tolerate app termination, OS permission changes, token expiry, clock skew, duplicate events, stale wearable data, and replayed webhooks.

## Permissions, Privacy, And Safety

- Treat health, pharmacy, patient, clinician, nutrition, sleep, reproductive, device, benefits, and wellness data as sensitive; encrypt at rest and in transit and require device lock for cached views where appropriate.
- Do not provide diagnosis, prescribing, emergency triage, eating-disorder treatment, medication administration guidance, or clinical advice unless a separately reviewed licensed-provider workflow exists.
- Consent, proxy, caregiver, professional, provider, organization, device, and employer/plan access must be explicit, auditable, revocable where lawful, and clearly separate from marketing preferences.
- Do not send PHI, raw health entries, prescription data, food diary details, sleep audio, professional identifiers, payment details, precise location, message contents, or child data as analytics properties.
- Provider-owned, payer-owned, pharmacy-owned, device-owned, employer-sponsored, or organization-owned records may not be deletable or exportable solely by the clone; display limitations and request status honestly.
- Native permission prompts for notifications, camera/document scan, microphone/audio, location/store search, Bluetooth/device sync, HealthKit, Health Connect, contacts, photos, and files must be just-in-time and have functional denial fallbacks.
- Safety copy must route urgent symptoms, mental-health crisis, suspected medication reactions, abnormal device readings, pregnancy emergency concerns, and severe nutrition/sleep risks to emergency or clinician-owned channels.
- Use original sample data and licensed third-party providers only after legal review.

## Analytics And Monetization

- Onboarding events: onboarding_started, permission_primer_viewed, signup_started, signup_completed, eligibility_checked, organization_or_plan_selected, and onboarding_blocked with source, locale, and experiment IDs.
- Core action events: home_viewed, detail_opened, primary_action_started, primary_action_completed, primary_action_failed, and support_started with object type and coarse failure code only.
- Retention events: notification_opened, reminder_configured, history_opened, export_started, device_sync_recovered, subscription_restored, and settings_updated.
- Safety/privacy events: privacy_setting_changed, data_export_requested, account_delete_requested, access_grant_created, access_grant_revoked, safety_block_shown, and urgent_disclaimer_viewed.
- Monetization events: paywall_viewed, trial_started, purchase_started, purchase_completed, purchase_failed, subscription_canceled, entitlement_restored, benefit_eligible, and entitlement_expired where monetization is in scope.
- Monetization model: use original free/trial/paid/sponsored/benefit entitlement logic; do not copy exact pricing, plan names, bundle names, promotional copy, employer offers, or partner offers from ${app.name}.
- Analytics rule: do not send raw content, medical symptoms, medication names, pharmacy records, food logs, sleep audio, precise location, professional identifiers, payment credentials, private messages, or child data as event properties.

## Edge Cases

- First launch with no network, unsupported OS, expired session, revoked token, unsupported region, missing benefit, or maintenance banner.
- Permission denied, permission later revoked in OS settings, limited permission granted, device disconnected, and permission granted after fallback use.
- Duplicate taps, retry after timeout, duplicate webhook delivery, stale optimistic UI, conflict after reconnect, and clock skew.
- Deleted, suspended, blocked, expired, unavailable, region-locked, entitlement-locked, provider-owned, payer-owned, pharmacy-owned, device-owned, or account-merged objects.
- Partial upload/download, corrupt cache, disk full, app termination during background work, and push delivered before local cache is ready.
- Abuse/fraud: account takeover, invite abuse, overbroad sharing, support social engineering, false clinical claims, unsafe requests, and policy escalation.
- Subscription, paid purchase, employer benefit, plan eligibility, or device service restored on a different platform, refunded externally, unavailable in region, or contradicted by server state.
- Legal/privacy request submitted while active care relationships, prescriptions, device syncs, provider messages, bills, support cases, or audit records still exist.

## Test Plan

- Unit tests for validation, state machines, permission gates, entitlement checks, idempotency keys, safety copy routing, and privacy-safe analytics payload construction.
- Integration tests for auth, onboarding, eligibility, primary reads/writes, settings, support, notifications, entitlement transitions, data export, and account deletion.
- Contract tests for every documented API response shape, error code, pagination behavior, webhook event, provider/device import, and realtime reconciliation path.
- Offline tests for cached reads, stale labels, queued safe drafts, blocked unsafe writes, reconnect reconciliation, and corrupt-cache recovery.
- Permission tests for denied, granted, revoked, limited-access, OS-settings recovery, HealthKit, Health Connect, camera, microphone, location, notification, and files states.
- Safety/privacy tests for sensitive-data redaction, consent/proxy/sharing revocation, support escalation, audit events, urgent disclaimers, and legal-link accessibility.
- Accessibility tests for screen reader labels, focus order, dynamic type, contrast, reduced motion, media alternatives, and error text.
- Billing/entitlement tests for trial, purchase, renewal, cancellation, refund, expiration, restore, employer/plan eligibility, and unavailable states where applicable.
- Notification tests for opt-in, denied, revoked, quiet hours, category preferences, reminder timing, deep links, and in-app notification center behavior.
- Manual verification tests for ${app.blockers}.

## Acceptance Criteria

- The app can be implemented with original branding, copy, media, data, and integrations while preserving the documented functional workflow.
- All research-source rows use exact public URLs or explicit platform/provider blockers; no source-discovery placeholder remains.
- A new user can complete onboarding and reach the default dashboard without unsupported permissions.
- A returning user can complete the primary workflow, recover from network failure, and confirm canonical server state after reconnect.
- Dashboard, detail, primary action, reminders, records/history, settings, support, notifications, entitlement, and deletion/export flows are represented in routes and tests.
- All entities have owners, lifecycle states, authorization rules, retention, audit events, and deletion/export behavior.
- At least 10 acceptance tests cover happy path, empty state, permission denial, offline behavior, accessibility, support/safety, entitlement, notifications, data deletion/export, and regression behavior.
- Hands-on native parity remains blocked until the manual verification blockers listed in metadata have recorded lawful evidence.

## Open Questions

- Which exact iOS and Android native screens, permission prompts, and push payloads differ materially from public marketplace claims?
- Which account, subscription, provider, pharmacy, device, employer/plan, professional, organization, region, or eligibility states require paid, sponsored, physical, or regulated test access?
- Which third-party providers will supply identity, payments, notifications, analytics, maps, pharmacy, telehealth, nutrition, device cloud, HealthKit, Health Connect, storage, media, or support services for the original clone?
- Which features are intentionally out of scope for legal, safety, budget, provider-contract, medical-device, or platform-policy reasons?
- What retention, export, and deletion limits apply to provider-owned, device-owned, health/pharmacy, billing, subscription, support, or audit records?

## Build Plan

- Phase 1: Convert this spec into route map, component map, domain entities, API schemas, permissions matrix, analytics schema, seed-data policy, and safety-review checklist.
- Phase 2: Build onboarding, dashboard, detail, primary workflow, settings, support, and entitlement shells with original copy and sample data.
- Phase 3: Add backend contracts, audit logging, offline/retry handling, notification preferences, consent/proxy/sharing controls, integrations, and data export/delete flows.
- Phase 4: Add app-specific safety controls for ${app.focus}.
- Phase 5: Complete accessibility, privacy, safety, entitlement, permission, offline, notification, billing, and regression tests.
- Phase 6: Conduct lawful hands-on native verification and resolve manual blockers before claiming one-for-one parity.

## Next Steps

- Capture native iOS and Android screen evidence for onboarding, dashboard, primary workflows, settings, permissions, notifications, subscription/benefit states, and account deletion.
- Record app-specific account, provider, pharmacy, device, employer/plan, subscription, region, and support blockers in a dedicated research note without committing proprietary screenshots or media.
- Confirm legal/privacy retention behavior for ${app.name}-style sensitive records and update API contracts before downstream implementation.
- Extend the Phase 5 implementation-plan queue and downstream repo source-spec copies after this readiness slice is accepted.
`;
}

for (const app of apps) {
  const file = path.join("specs", "batch-34", `${app.id}-${app.slug}.md`);
  fs.writeFileSync(file, spec(app));
  console.log(`wrote ${file}`);
}
