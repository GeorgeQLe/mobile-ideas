# Phase 21: Implementation — Health, Fitness & Wellness (~82 Apps × 5 Variants)

> Test strategy: none
> Source roadmap: `tasks/roadmap.md`

**Goal**: Build all five variants for every app in the Health, Fitness & Wellness cluster.

**Scope**:
- Apps (82 reconciled): Fitness & Activity Tracking (18), Telehealth & Virtual Care (14), Sleep & Recovery (8), Nutrition & Diet (5), Mental Wellness & Meditation (2), Wellness Audio (2), Women's Health & Reproductive (4), Pharmacy & Medications (3), Health Records & Clinical (2), Wearable & Health Platforms (5), Pregnancy & Maternity (3), Baby & Child Tracking (3), Parenting Community (1), Childcare & Family Tools (2), Family Safety & Monitoring (5), Parental Controls & Family (4), Family Photos & Sharing (1).
- Shared patterns: activity tracking, workout logging, health data visualization, HealthKit/Google Fit integration, guided content playback, appointment booking, prescription management, sleep tracking, nutrition/calorie logging, family location sharing, parental controls.

**Acceptance Criteria:**
- [x] Exact Phase 21 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness (82 apps).
- [ ] All Phase 21 apps have 5 working variants each or explicit local/toolchain/provider/health/regulatory blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] Health data tracking, workout flows, and guided content functional across variants or explicitly blocked by local/provider/health/regulatory constraints.
- [ ] Category-specific risk review for health/medical, telehealth, pharmacy, women's health, child-directed, and family safety features is documented.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share health data, activity tracking, and guided content patterns. Extra care for health-adjacent, child-directed, and family safety regulatory blockers.

### Execution Profile
**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low
**Review gates:** inventory correctness, private repo verification, source-spec presence, no GitHub Actions, health/medical/child/family regulatory blocker review

### Implementation

- [x] Step 21.1: Reconcile exact Health, Fitness & Wellness app inventory and downstream readiness (82 apps verified 2026-06-04)
  - Reconcile all 82 apps across IDs 082-088 (batch-05), 150-160 (batch-08), 161-169 (batch-09), 291-292 (batch-15), 356-360 (batch-18), 361-368 (batch-19), 658-660 (batch-33), 661-680 (batch-34), 681-697 (batch-35).
  - Serial GitHub API verification: visibility == PRIVATE, default branch == main, README present, source spec present under docs/source-specs/, root commit present, no .github/workflows.
  - Record pre/post rate-limit evidence.
  - Classify risk groups: fitness tracking, telehealth, pharmacy, health records, mental health/therapy, women's health, sleep/recovery, nutrition, wearable platforms, wellness audio, pregnancy/maternity, parenting/family, family safety, parental controls.
  - Document carry-forward blockers: HealthKit/Google Fit APIs, wearable device pairing (BLE), telehealth video/audio, prescription processing (DEA/state pharmacy boards), health records (HIPAA/HL7 FHIR), therapy licensing, women's health data privacy, sleep sensor hardware, nutrition databases, family location tracking, child-directed content (COPPA), parental controls (MDM/device APIs), payment processing, push notifications.

  **Acceptance Criteria:**
  - Inventory of all Phase 21 apps with IDs, names, repo slugs, spec paths, and downstream repo status.
  - All repos verified PRIVATE with required artifacts.
  - Risk groups and blocker posture documented.
  - Rate-limit evidence recorded.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`.

- [x] Step 21.2: First Health & Fitness tranche — Fitness & Activity Tracking (18 apps) + Meditation/Wellness (2 apps) = 20 apps (completed 2026-06-04)
  - **Apps:** Headspace (082), Calm (083), Strava (084), Nike Run Club (085), MyFitnessPal (086), Fitbit (087), Peloton (356), Zwift (357), Garmin Connect (358), Nike Training Club (359), Fitbod (360), Strong (361), Hevy (362), Runkeeper (363), MapMyRun (364), Komoot (365), Relive (366), TrainerRoad (367), TrainingPeaks (368), Athlytic (682).

  NOTE: Headspace (082) and Calm (083) are meditation/wellness apps but grouped here for batch efficiency with existing fitness batch-05 apps. Total is 20 apps.

  **What to Build:**
  Original static prototypes (`index.html`, `package.json`, `src/styles.css`, `src/app.js`) for each of the 20 downstream repos covering:
  - Meditation/wellness (Headspace, Calm): guided meditation library, sleep stories, focus/breathing exercises, daily mindfulness, progress streaks, subscription tiers
  - Running/outdoor (Strava, Nike Run Club, Runkeeper, MapMyRun, Komoot, Relive): GPS activity recording placeholder, route mapping, pace/distance/elevation, segments/leaderboards, social feed, training plans, trail/outdoor navigation
  - Nutrition/fitness (MyFitnessPal): food logging, calorie/macro tracking, barcode scanner placeholder, meal plans, exercise logging, weight tracking
  - Wearable/health tracking (Fitbit, Garmin Connect, Athlytic): activity dashboard, steps/heart rate/sleep, device sync placeholder, health metrics, challenges, Apple Watch analytics (Athlytic)
  - Connected fitness (Peloton, Zwift): class library, live/on-demand workouts, leaderboard, cycling/running simulation (Zwift), instructor profiles, workout history
  - Gym/strength (Nike Training Club, Fitbod, Strong, Hevy): workout builder, exercise library, rep/set/weight tracking, workout history, progress charts, AI-generated workouts (Fitbod)
  - Cycling training (TrainerRoad, TrainingPeaks): structured training plans, power/HR zones, workout calendar, performance analytics, coaching integration
  - All apps: explicit blockers for HealthKit/Google Fit APIs, GPS/location, wearable BLE pairing, heart rate/biometric sensors, payment/subscription, push notifications, and health data privacy

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Write a Node.js generator script at `/tmp/generate-fitness-prototypes.mjs` defining all 20 apps with category-specific data.
  3. For each of the 20 repos, serially: clone to /tmp, create prototype files (`index.html`, `package.json`, `src/styles.css`, `src/app.js`), run `npm run check`, commit, push, verify via `gh api`.
  4. `gh api rate_limit` — record post-scan evidence.
  5. Update `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Repo slugs (20):**
  `headspace-mobile-clone`, `calm-mobile-clone`, `strava-mobile-clone`, `nike-run-club-mobile-clone`, `myfitnesspal-mobile-clone`, `fitbit-mobile-clone`, `peloton-mobile-clone`, `zwift-mobile-clone`, `garmin-connect-mobile-clone`, `nike-training-club-mobile-clone`, `fitbod-mobile-clone`, `strong-mobile-clone`, `hevy-mobile-clone`, `runkeeper-mobile-clone`, `mapmyrun-mobile-clone`, `komoot-mobile-clone`, `relive-mobile-clone`, `trainerroad-mobile-clone`, `trainingpeaks-mobile-clone`, `athlytic-mobile-clone`

  **Source specs:** `specs/batch-05/082-headspace.md` through `specs/batch-05/087-fitbit.md`, `specs/batch-18/356-peloton.md` through `specs/batch-18/360-fitbod.md`, `specs/batch-19/361-strong.md` through `specs/batch-19/368-trainingpeaks.md`, `specs/batch-35/682-athlytic.md`

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 20 repos have `index.html`, `package.json`, `src/styles.css`, `src/app.js` committed and pushed.
  - `npm run check` passes in each repo.
  - Each repo verified PRIVATE with all required artifacts via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Category-specific blockers documented per app.

  **Ship-one-step handoff:** Implement only Step 21.2, validate it, then run `/ship` when done.

  **Files:** downstream repos (20), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [x] Step 21.3: Second Health & Fitness tranche — Telehealth, Pharmacy & Health Records (19 apps) (completed 2026-06-04)
  - **Apps:** GoodRx (150), Walgreens (151), Zocdoc (152), Teladoc (153), BetterHelp (154), Talkspace (155), Hims & Hers (156), Ro (157), MyChart (658), Doximity (659), CVS Health (660), Express Scripts (661), Amwell (662), MDLIVE (663), Doctor On Demand (664), HealthTap (665), One Medical (666), Carbon Health (667), Maven Clinic (669).

  **What to Build:**
  Original static prototypes for each of the 19 telehealth/pharmacy/health record downstream repos covering:
  - Prescription pricing (GoodRx): drug search, price comparison, coupon cards, pharmacy finder
  - Pharmacy (Walgreens, CVS Health): Rx management, refill ordering, pharmacy finder, health services, photo/shopping, rewards/ExtraCare
  - Pharmacy benefits (Express Scripts): PBM portal, mail-order Rx, formulary check, prior auth status
  - Doctor booking (Zocdoc): doctor search, appointment booking, insurance verification, reviews
  - Telehealth (Teladoc, Amwell, MDLIVE, Doctor On Demand, HealthTap): virtual visit booking, video consultation placeholder, prescriptions, medical history
  - DTC telehealth (Hims & Hers, Ro): condition-specific treatment plans, Rx delivery, subscription management
  - Therapy (BetterHelp, Talkspace): therapist matching, messaging/video sessions, journal, worksheets
  - Specialty telehealth (Maven Clinic): women's & family health, fertility, maternity programs
  - Primary care membership (One Medical, Carbon Health): membership, appointment booking, messaging, lab results
  - Health records (MyChart): patient portal, lab results, appointments, messaging, medications, immunizations
  - Provider network (Doximity): physician directory, secure messaging, telehealth tools, CME
  - All apps: explicit blockers for HIPAA compliance, telehealth video/audio, e-prescribing (EPCS/DEA), pharmacy dispensing, insurance claims, patient records (HL7 FHIR), therapy licensing, payment processing, push notifications

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Write a Node.js generator script at `/tmp/generate-telehealth-prototypes.mjs` defining all 19 apps.
  3. Serial clone → create files → `npm run check` → commit → push → verify via `gh api`.
  4. `gh api rate_limit` — record post-scan evidence.
  5. Update `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Repo slugs (19):**
  `goodrx-mobile-clone`, `walgreens-mobile-clone`, `zocdoc-mobile-clone`, `teladoc-mobile-clone`, `betterhelp-mobile-clone`, `talkspace-mobile-clone`, `hims-and-hers-mobile-clone`, `ro-mobile-clone`, `mychart-mobile-clone`, `doximity-mobile-clone`, `cvs-health-mobile-clone`, `express-scripts-mobile-clone`, `amwell-mobile-clone`, `mdlive-mobile-clone`, `doctor-on-demand-mobile-clone`, `healthtap-mobile-clone`, `one-medical-mobile-clone`, `carbon-health-mobile-clone`, `maven-clinic-mobile-clone`

  **Source specs:** `specs/batch-08/150-goodrx.md` through `specs/batch-08/157-ro.md`, `specs/batch-33/658-mychart.md` through `specs/batch-33/660-cvs-health.md`, `specs/batch-34/661-express-scripts.md` through `specs/batch-34/669-maven-clinic.md`

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 19 repos have `index.html`, `package.json`, `src/styles.css`, `src/app.js` committed and pushed.
  - `npm run check` passes in each repo.
  - Each repo verified PRIVATE with all required artifacts via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Category-specific blockers documented: HIPAA, telehealth A/V, e-prescribing, pharmacy dispensing, insurance, patient records, therapy licensing.

  **Ship-one-step handoff:** Implement only Step 21.3, validate it, then run `/ship` when done.

  **Files:** downstream repos (19), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [x] Step 21.4: Third Health & Fitness tranche — Sleep, Nutrition, Wellness & Wearable Platforms (22 apps) (completed 2026-06-05)
  - **Apps:** Oura (158), Whoop (159), Sleep Cycle (160), Flo (088), Clue (161), Ovia (162), Nurx (668), Endel (291), Brain.fm (292), Noom (670), Lose It! (671), Cronometer (672), Lifesum (673), WaterMinder (674), Pillow (675), AutoSleep (676), SleepScore (677), Withings Health Mate (678), Samsung Health (679), Apple Health (680), Google Fit (681), Welltory (683).

  **What to Build:**
  Original static prototypes for each of the 22 downstream repos covering:
  - Sleep tracking (Oura, Whoop, Sleep Cycle, Pillow, AutoSleep, SleepScore): sleep stages, sleep score, smart alarm, HRV/readiness, recovery metrics, sleep trends
  - Sleep optimization (Rise Sleep (684), Pzizz (685)): sleep debt tracking, circadian rhythm, sleep sounds, nap sessions — NOTE: Rise Sleep and Pzizz are in Step 21.5
  - Women's health (Flo, Clue, Ovia, Nurx): cycle tracking, period predictions, fertility window, pregnancy mode, symptom logging, telehealth contraception (Nurx)
  - Wellness audio (Endel, Brain.fm): AI-generated soundscapes, focus/relax/sleep modes, personalized audio, timer/session
  - Nutrition (Noom, Lose It!, Cronometer, Lifesum, WaterMinder): calorie/macro tracking, food logging, weight management coaching (Noom), meal planning, hydration tracking, barcode scanning placeholder
  - Wearable platforms (Withings Health Mate, Samsung Health, Apple Health, Google Fit, Welltory): health dashboard, activity/sleep/heart data aggregation, device sync placeholder, health metrics, HRV analytics (Welltory)
  - All apps: explicit blockers for HealthKit/Google Fit APIs, wearable BLE pairing, biometric sensors, health data privacy (reproductive data sensitivity), AI audio generation, nutrition databases, payment/subscription, push notifications

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Write a Node.js generator script at `/tmp/generate-wellness-prototypes.mjs` defining all 22 apps.
  3. Serial clone → create files → `npm run check` → commit → push → verify via `gh api`.
  4. `gh api rate_limit` — record post-scan evidence.
  5. Update `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Repo slugs (22):**
  `oura-mobile-clone`, `whoop-mobile-clone`, `sleep-cycle-mobile-clone`, `flo-mobile-clone`, `clue-mobile-clone`, `ovia-mobile-clone`, `nurx-mobile-clone`, `endel-mobile-clone`, `brain-fm-mobile-clone`, `noom-mobile-clone`, `lose-it-mobile-clone`, `cronometer-mobile-clone`, `lifesum-mobile-clone`, `waterminder-mobile-clone`, `pillow-mobile-clone`, `autosleep-mobile-clone`, `sleepscore-mobile-clone`, `withings-health-mate-mobile-clone`, `samsung-health-mobile-clone`, `apple-health-mobile-clone`, `google-fit-mobile-clone`, `welltory-mobile-clone`

  **Source specs:** `specs/batch-08/158-oura.md` through `specs/batch-08/160-sleep-cycle.md`, `specs/batch-05/088-flo.md`, `specs/batch-09/161-clue.md`, `specs/batch-09/162-ovia.md`, `specs/batch-34/668-nurx.md`, `specs/batch-15/291-endel.md`, `specs/batch-15/292-brain-fm.md`, `specs/batch-34/670-noom.md` through `specs/batch-34/680-apple-health.md`, `specs/batch-35/681-google-fit.md`, `specs/batch-35/683-welltory.md`

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 22 repos have `index.html`, `package.json`, `src/styles.css`, `src/app.js` committed and pushed.
  - `npm run check` passes in each repo.
  - Each repo verified PRIVATE with all required artifacts via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Category-specific blockers documented: wearable BLE/sensor, HealthKit/Google Fit, reproductive data privacy, AI audio generation, nutrition databases.

  **Ship-one-step handoff:** Implement only Step 21.4, validate it, then run `/ship` when done.

  **Files:** downstream repos (22), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [x] Step 21.5: Fourth Health & Fitness tranche — Pregnancy, Parenting, Family Safety & Remaining (21 apps) (completed 2026-06-05)
  - **Apps:** BabyCenter (163), Huckleberry (164), Cozi (165), Life360 (166), Bark (167), Qustodio (168), Google Family Link (169), Rise Sleep (684), Pzizz (685), The Bump (686), What to Expect (687), Peanut (688), Find My Kids (689), Family Link (690), OurPact (691), Circle Parental Controls (692), FamCal (693), Winnie (694), Kinedu (695), Sprout Baby (696), FamilyAlbum (697).

  **What to Build:**
  Original static prototypes for each of the 21 downstream repos covering:
  - Pregnancy/maternity (BabyCenter, The Bump, What to Expect): week-by-week pregnancy tracking, baby development milestones, articles/community, due date calculator
  - Baby tracking (Huckleberry, Sprout Baby, Kinedu): sleep/feeding/diaper tracking, sleep schedule predictions, milestone tracking, developmental activities
  - Parenting community (Peanut): parent matching/social, community groups, Q&A, events
  - Family calendar (Cozi, FamCal): shared family calendar, grocery lists, meal planning, to-do lists, family journal
  - Childcare (Winnie): childcare/preschool search, reviews, waitlists, parent community
  - Family safety (Life360, Find My Kids): family location sharing, driving safety, crash detection, place alerts, SOS
  - Parental monitoring (Bark): screen time monitoring, content alerts, social media monitoring, location tracking
  - Parental controls (Qustodio, Google Family Link, Family Link, OurPact, Circle Parental Controls): app/screen time limits, content filtering, location tracking, device management
  - Sleep optimization (Rise Sleep, Pzizz): sleep debt tracking, circadian rhythm, sleep sounds, nap optimization
  - Family photos (FamilyAlbum): private family photo/video sharing, milestone albums, family members
  - All apps: explicit blockers for child-directed content (COPPA/KOSA), family location tracking (GPS), parental controls (MDM/device management APIs), screen time APIs, social media API monitoring, health data privacy, push notifications, payment/subscription

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Write a Node.js generator script at `/tmp/generate-family-prototypes.mjs` defining all 21 apps.
  3. Serial clone → create files → `npm run check` → commit → push → verify via `gh api`.
  4. `gh api rate_limit` — record post-scan evidence.
  5. Update `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Repo slugs (21):**
  `babycenter-mobile-clone`, `huckleberry-mobile-clone`, `cozi-mobile-clone`, `life360-mobile-clone`, `bark-mobile-clone`, `qustodio-mobile-clone`, `google-family-link-mobile-clone`, `rise-sleep-mobile-clone`, `pzizz-mobile-clone`, `the-bump-mobile-clone`, `what-to-expect-mobile-clone`, `peanut-mobile-clone`, `find-my-kids-mobile-clone`, `family-link-mobile-clone`, `ourpact-mobile-clone`, `circle-parental-controls-mobile-clone`, `famcal-mobile-clone`, `winnie-mobile-clone`, `kinedu-mobile-clone`, `sprout-baby-mobile-clone`, `familyalbum-mobile-clone`

  **Source specs:** `specs/batch-09/163-babycenter.md` through `specs/batch-09/169-google-family-link.md`, `specs/batch-35/684-rise-sleep.md` through `specs/batch-35/697-familyalbum.md`

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 21 repos have `index.html`, `package.json`, `src/styles.css`, `src/app.js` committed and pushed.
  - `npm run check` passes in each repo.
  - Each repo verified PRIVATE with all required artifacts via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Category-specific blockers documented: COPPA/KOSA child-directed, family GPS tracking, parental controls MDM/device APIs, pregnancy/maternity health data, screen time monitoring.

  **Ship-one-step handoff:** Implement only Step 21.5, validate it, then run `/ship` when done.

  **Files:** downstream repos (21), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [x] Step 21.6: Fifth Health & Fitness tranche — React Native variant for Fitness & Activity Tracking apps (20 apps) (completed 2026-06-05)
  - **Apps:** Same 20 apps from Step 21.2: Headspace (082), Calm (083), Strava (084), Nike Run Club (085), MyFitnessPal (086), Fitbit (087), Peloton (356), Zwift (357), Garmin Connect (358), Nike Training Club (359), Fitbod (360), Strong (361), Hevy (362), Runkeeper (363), MapMyRun (364), Komoot (365), Relive (366), TrainerRoad (367), TrainingPeaks (368), Athlytic (682).

  **What to Build:**
  React Native variant scaffolds under `variants/react-native/` for each of the 20 downstream repos. Each scaffold includes:
  - `variants/react-native/package.json` with React Native + Expo dependencies, lint/typecheck/test scripts
  - `variants/react-native/tsconfig.json` with strict TypeScript config
  - `variants/react-native/app.json` with Expo app config
  - `variants/react-native/index.js` entry point
  - `variants/react-native/src/screens/` with HomeScreen and category-specific screens (e.g., WorkoutScreen, ActivityScreen, ProfileScreen)
  - `variants/react-native/src/components/` with shared UI components
  - `variants/react-native/src/navigation/` with React Navigation stack/tab setup
  - `variants/react-native/src/services/` with mock data services
  - `variants/react-native/src/hooks/` with custom hooks
  - Category-specific screens per app type: meditation (guided session, sleep stories), running (activity recording, routes), nutrition (food log, macros), wearable (dashboard, device sync), connected fitness (classes, leaderboard), gym (workout builder, exercise library), cycling training (plans, zones)
  - Explicit blockers carried forward from Step 21.2 plus React Native-specific: Expo SDK version constraints, native module linking (HealthKit, BLE), EAS Build requirements, Metro bundler config

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Write a Node.js generator script at `/tmp/generate-fitness-rn-variants.mjs` defining all 20 apps with category-specific React Native screens.
  3. For each of the 20 repos, serially: clone to /tmp, create `variants/react-native/` scaffold files, run lint check (if applicable), commit, push, verify via `gh api`.
  4. `gh api rate_limit` — record post-scan evidence.
  5. Update `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Repo slugs (20):** Same as Step 21.2.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 20 repos have `variants/react-native/` scaffold with `package.json`, `tsconfig.json`, `app.json`, `index.js`, and `src/` directory committed and pushed.
  - Each repo verified PRIVATE with new variant files via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Category-specific React Native blockers documented.

  **Ship-one-step handoff:** Implement only Step 21.6, validate it, then run `/ship` when done.

  **Files:** downstream repos (20), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [x] Step 21.7: Sixth Health & Fitness tranche — React Native variant for Telehealth, Pharmacy & Health Records (19 apps) (completed 2026-06-05)
  - **Apps:** Same 19 apps from Step 21.3: GoodRx (150), Walgreens (151), Zocdoc (152), Teladoc (153), BetterHelp (154), Talkspace (155), Hims & Hers (156), Ro (157), MyChart (658), Doximity (659), CVS Health (660), Express Scripts (661), Amwell (662), MDLIVE (663), Doctor On Demand (664), HealthTap (665), One Medical (666), Carbon Health (667), Maven Clinic (669).

  **What to Build:**
  React Native variant scaffolds under `variants/react-native/` for each of the 19 downstream repos. Each scaffold includes:
  - `variants/react-native/package.json` with React Native + Expo dependencies, lint/typecheck/test scripts
  - `variants/react-native/tsconfig.json` with strict TypeScript config
  - `variants/react-native/app.json` with Expo app config
  - `variants/react-native/index.js` entry point
  - `variants/react-native/src/screens/` with HomeScreen and category-specific screens
  - `variants/react-native/src/components/` with shared UI components
  - `variants/react-native/src/navigation/` with React Navigation stack/tab setup
  - `variants/react-native/src/services/` with mock data services
  - `variants/react-native/src/hooks/` with custom hooks
  - `variants/react-native/BLOCKERS.md` with category-specific + RN-specific blockers
  - Category-specific screens per app type:
    - Prescription pricing (GoodRx): DrugSearchScreen, PriceCompareScreen, CouponScreen, PharmacyFinderScreen
    - Pharmacy (Walgreens, CVS Health): RxManagementScreen, RefillScreen, PharmacyScreen, RewardsScreen
    - Pharmacy benefits (Express Scripts): BenefitsScreen, MailOrderScreen, FormularyScreen
    - Doctor booking (Zocdoc): DoctorSearchScreen, BookingScreen, InsuranceScreen, ReviewsScreen
    - Telehealth (Teladoc, Amwell, MDLIVE, Doctor On Demand, HealthTap): VisitBookingScreen, ConsultationScreen, PrescriptionsScreen, HistoryScreen
    - DTC telehealth (Hims & Hers, Ro): TreatmentScreen, DeliveryScreen, SubscriptionScreen
    - Therapy (BetterHelp, Talkspace): TherapistMatchScreen, SessionScreen, JournalScreen, WorksheetScreen
    - Specialty telehealth (Maven Clinic): ProgramScreen, FertilityScreen, MaternityScreen
    - Primary care (One Medical, Carbon Health): MembershipScreen, AppointmentScreen, MessagingScreen, LabResultsScreen
    - Health records (MyChart): PortalScreen, LabResultsScreen, MedicationsScreen, ImmunizationsScreen
    - Provider network (Doximity): DirectoryScreen, SecureMessageScreen, CMEScreen
  - Explicit blockers carried forward from Step 21.3 plus React Native-specific: Expo SDK constraints, native module linking (video/audio for telehealth, camera for Rx scanning), EAS Build requirements, HIPAA-compliant data storage considerations

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Write a Node.js generator script at `/tmp/generate-telehealth-rn-variants.mjs` defining all 19 apps with category-specific React Native screens.
  3. For each of the 19 repos, serially: clone to /tmp, create `variants/react-native/` scaffold files, commit, push, verify via `gh api`.
  4. `gh api rate_limit` — record post-scan evidence.
  5. Update `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Repo slugs (19):**
  `goodrx-mobile-clone`, `walgreens-mobile-clone`, `zocdoc-mobile-clone`, `teladoc-mobile-clone`, `betterhelp-mobile-clone`, `talkspace-mobile-clone`, `hims-and-hers-mobile-clone`, `ro-mobile-clone`, `mychart-mobile-clone`, `doximity-mobile-clone`, `cvs-health-mobile-clone`, `express-scripts-mobile-clone`, `amwell-mobile-clone`, `mdlive-mobile-clone`, `doctor-on-demand-mobile-clone`, `healthtap-mobile-clone`, `one-medical-mobile-clone`, `carbon-health-mobile-clone`, `maven-clinic-mobile-clone`

  **Source specs:** `specs/batch-08/150-goodrx.md` through `specs/batch-08/157-ro.md`, `specs/batch-33/658-mychart.md` through `specs/batch-33/660-cvs-health.md`, `specs/batch-34/661-express-scripts.md` through `specs/batch-34/669-maven-clinic.md`

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 19 repos have `variants/react-native/` scaffold with `package.json`, `tsconfig.json`, `app.json`, `index.js`, and `src/` directory committed and pushed.
  - Each repo verified PRIVATE with new variant files via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Category-specific React Native blockers documented: HIPAA data handling, telehealth video/audio (WebRTC native modules), e-prescribing, pharmacy Rx scanning (camera), insurance verification, HL7 FHIR patient records, therapy session encryption, payment processing.

  **Ship-one-step handoff:** Implement only Step 21.7, validate it, then run `/ship` when done.

  **Files:** downstream repos (19), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [x] Step 21.8: Seventh Health & Fitness tranche — React Native variant for Sleep, Nutrition, Wellness & Wearable Platforms (22 apps) (completed 2026-06-05)
  - **Apps:** Same 22 apps from Step 21.4: Oura (158), Whoop (159), Sleep Cycle (160), Flo (088), Clue (161), Ovia (162), Nurx (668), Endel (291), Brain.fm (292), Noom (670), Lose It! (671), Cronometer (672), Lifesum (673), WaterMinder (674), Pillow (675), AutoSleep (676), SleepScore (677), Withings Health Mate (678), Samsung Health (679), Apple Health (680), Google Fit (681), Welltory (683).

  **What to Build:**
  React Native variant scaffolds under `variants/react-native/` for each of the 22 downstream repos. Each scaffold includes:
  - `variants/react-native/package.json` with React Native + Expo dependencies, lint/typecheck/test scripts
  - `variants/react-native/tsconfig.json` with strict TypeScript config
  - `variants/react-native/app.json` with Expo app config
  - `variants/react-native/index.js` entry point
  - `variants/react-native/src/screens/` with HomeScreen and category-specific screens
  - `variants/react-native/src/components/` with shared UI components
  - `variants/react-native/src/navigation/` with React Navigation stack/tab setup
  - `variants/react-native/src/services/` with mock data services
  - `variants/react-native/src/hooks/` with custom hooks
  - `variants/react-native/BLOCKERS.md` with category-specific + RN-specific blockers
  - Category-specific screens per app type:
    - Sleep tracking (Oura, Whoop, Sleep Cycle, Pillow, AutoSleep, SleepScore): SleepDashboardScreen, SleepStagesScreen, ReadinessScreen, TrendsScreen, SettingsScreen
    - Women's health (Flo, Clue, Ovia, Nurx): CycleScreen, CalendarScreen, SymptomsScreen, InsightsScreen
    - Wellness audio (Endel, Brain.fm): PlayerScreen, SoundscapeScreen, TimerScreen, LibraryScreen
    - Nutrition (Noom, Lose It!, Cronometer, Lifesum, WaterMinder): DiaryScreen, FoodSearchScreen, NutritionScreen, WeightScreen
    - Wearable platforms (Withings Health Mate, Samsung Health, Apple Health, Google Fit, Welltory): DashboardScreen, DevicesScreen, HealthMetricsScreen, ActivityScreen
  - Explicit blockers carried forward from Step 21.4 plus React Native-specific: Expo SDK constraints, native module linking (HealthKit, BLE, biometric sensors), EAS Build requirements, reproductive health data privacy, AI audio generation, nutrition database licensing

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Write a Node.js generator script at `/tmp/generate-wellness-rn-variants.mjs` defining all 22 apps with category-specific React Native screens.
  3. For each of the 22 repos, serially: clone to /tmp, create `variants/react-native/` scaffold files, commit, push, verify via `gh api`.
  4. `gh api rate_limit` — record post-scan evidence.
  5. Update `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Repo slugs (22):**
  `oura-mobile-clone`, `whoop-mobile-clone`, `sleep-cycle-mobile-clone`, `flo-mobile-clone`, `clue-mobile-clone`, `ovia-mobile-clone`, `nurx-mobile-clone`, `endel-mobile-clone`, `brain-fm-mobile-clone`, `noom-mobile-clone`, `lose-it-mobile-clone`, `cronometer-mobile-clone`, `lifesum-mobile-clone`, `waterminder-mobile-clone`, `pillow-mobile-clone`, `autosleep-mobile-clone`, `sleepscore-mobile-clone`, `withings-health-mate-mobile-clone`, `samsung-health-mobile-clone`, `apple-health-mobile-clone`, `google-fit-mobile-clone`, `welltory-mobile-clone`

  **Source specs:** `specs/batch-08/158-oura.md` through `specs/batch-08/160-sleep-cycle.md`, `specs/batch-05/088-flo.md`, `specs/batch-09/161-clue.md`, `specs/batch-09/162-ovia.md`, `specs/batch-34/668-nurx.md`, `specs/batch-15/291-endel.md`, `specs/batch-15/292-brain-fm.md`, `specs/batch-34/670-noom.md` through `specs/batch-34/680-apple-health.md`, `specs/batch-35/681-google-fit.md`, `specs/batch-35/683-welltory.md`

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 22 repos have `variants/react-native/` scaffold with `package.json`, `tsconfig.json`, `app.json`, `index.js`, and `src/` directory committed and pushed.
  - Each repo verified PRIVATE with new variant files via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Category-specific React Native blockers documented: HealthKit/Google Fit native modules, BLE device pairing (wearables), biometric sensor APIs, reproductive data privacy, AI audio generation engine, nutrition database licensing, barcode scanner camera API, HRV algorithms, sleep sensor hardware.

  **Ship-one-step handoff:** Implement only Step 21.8, validate it, then run `/ship` when done.

  **Files:** downstream repos (22), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [x] Step 21.9: Eighth Health & Fitness tranche — React Native variant for Pregnancy, Parenting, Family Safety & Remaining (21 apps) (completed 2026-06-05)
  - **Apps:** Same 21 apps from Step 21.5: BabyCenter (163), Huckleberry (164), Cozi (165), Life360 (166), Bark (167), Qustodio (168), Google Family Link (169), Rise Sleep (684), Pzizz (685), The Bump (686), What to Expect (687), Peanut (688), Find My Kids (689), Family Link (690), OurPact (691), Circle Parental Controls (692), FamCal (693), Winnie (694), Kinedu (695), Sprout Baby (696), FamilyAlbum (697).

  **What to Build:**
  React Native variant scaffolds under `variants/react-native/` for each of the 21 downstream repos. Each scaffold includes:
  - `variants/react-native/package.json` with React Native + Expo dependencies, lint/typecheck/test scripts
  - `variants/react-native/tsconfig.json` with strict TypeScript config
  - `variants/react-native/app.json` with Expo app config
  - `variants/react-native/index.js` entry point
  - `variants/react-native/src/screens/` with HomeScreen and category-specific screens
  - `variants/react-native/src/components/` with shared UI components
  - `variants/react-native/src/navigation/` with React Navigation stack/tab setup
  - `variants/react-native/src/services/` with mock data services
  - `variants/react-native/src/hooks/` with custom hooks
  - `variants/react-native/BLOCKERS.md` with category-specific + RN-specific blockers
  - Category-specific screens per app type:
    - Pregnancy/maternity (BabyCenter, The Bump, What to Expect): WeekByWeekScreen, MilestonesScreen, ArticlesScreen, CommunityScreen
    - Baby tracking (Huckleberry, Sprout Baby, Kinedu): TrackingScreen, ScheduleScreen, MilestonesScreen, ActivitiesScreen
    - Parenting community (Peanut): MatchScreen, GroupsScreen, FeedScreen, EventsScreen
    - Family calendar (Cozi, FamCal): CalendarScreen, ListsScreen, MealPlanScreen, JournalScreen
    - Childcare (Winnie): SearchScreen, ReviewsScreen, WaitlistScreen, CommunityScreen
    - Family safety (Life360, Find My Kids): MapScreen, MembersScreen, PlacesScreen, AlertsScreen
    - Parental monitoring (Bark): MonitorScreen, AlertsScreen, ScreenTimeScreen, LocationScreen
    - Parental controls (Qustodio, Google Family Link, Family Link, OurPact, Circle Parental Controls): DevicesScreen, ScreenTimeScreen, ContentFilterScreen, LocationScreen
    - Sleep optimization (Rise Sleep, Pzizz): SleepDebtScreen, CircadianScreen, SoundsScreen, SessionScreen
    - Family photos (FamilyAlbum): AlbumScreen, MomentsScreen, MembersScreen, SettingsScreen
  - Explicit blockers: COPPA/KOSA child-directed compliance, family GPS location tracking, MDM/device management APIs, screen time APIs, social media monitoring, pregnancy health data privacy, AI sleep prediction, algorithmic audio generation, community moderation, photo storage, Expo SDK constraints, EAS Build requirements

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Write a Node.js generator script at `/tmp/generate-family-rn-variants.mjs` defining all 21 apps with category-specific React Native screens.
  3. For each of the 21 repos, serially: clone to /tmp, create `variants/react-native/` scaffold files, commit, push, verify via `gh api`.
  4. `gh api rate_limit` — record post-scan evidence.
  5. Update `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Repo slugs (21):**
  `babycenter-mobile-clone`, `huckleberry-mobile-clone`, `cozi-mobile-clone`, `life360-mobile-clone`, `bark-mobile-clone`, `qustodio-mobile-clone`, `google-family-link-mobile-clone`, `rise-sleep-mobile-clone`, `pzizz-mobile-clone`, `the-bump-mobile-clone`, `what-to-expect-mobile-clone`, `peanut-mobile-clone`, `find-my-kids-mobile-clone`, `family-link-mobile-clone`, `ourpact-mobile-clone`, `circle-parental-controls-mobile-clone`, `famcal-mobile-clone`, `winnie-mobile-clone`, `kinedu-mobile-clone`, `sprout-baby-mobile-clone`, `familyalbum-mobile-clone`

  **Source specs:** `specs/batch-09/163-babycenter.md` through `specs/batch-09/169-google-family-link.md`, `specs/batch-35/684-rise-sleep.md` through `specs/batch-35/697-familyalbum.md`

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 21 repos have `variants/react-native/` scaffold with `package.json`, `tsconfig.json`, `app.json`, `index.js`, and `src/` directory committed and pushed.
  - Each repo verified PRIVATE with new variant files via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Category-specific React Native blockers documented: COPPA/KOSA child-directed, family GPS tracking, MDM/device management APIs, screen time APIs, social media API monitoring, pregnancy health data privacy, AI sleep/audio generation, community moderation, photo storage/fulfillment, Expo SDK constraints, EAS Build requirements.

  **Ship-one-step handoff:** Implement only Step 21.9, validate it, then run `/ship` when done.

  **Files:** downstream repos (21), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [x] Step 21.10: Ninth Health & Fitness tranche — Flutter variant for Fitness & Activity Tracking apps (20 apps) (completed 2026-06-05)
  - **Apps:** Same 20 apps from Steps 21.2/21.6: Headspace (082), Calm (083), Strava (084), Nike Run Club (085), MyFitnessPal (086), Fitbit (087), Peloton (356), Zwift (357), Garmin Connect (358), Nike Training Club (359), Fitbod (360), Strong (361), Hevy (362), Runkeeper (363), MapMyRun (364), Komoot (365), Relive (366), TrainerRoad (367), TrainingPeaks (368), Athlytic (682).

  **What to Build:**
  Flutter variant scaffolds under `variants/flutter/` for each of the 20 downstream repos. Each scaffold includes:
  - `variants/flutter/pubspec.yaml` — Flutter SDK, Dart deps (go_router, provider, http, flutter_svg), dev deps (flutter_test, flutter_lints)
  - `variants/flutter/analysis_options.yaml` — strict Dart lint rules
  - `variants/flutter/lib/main.dart` — app entry point with MaterialApp + GoRouter
  - `variants/flutter/lib/screens/` — HomeScreen and category-specific screens (matching RN variant screens)
  - `variants/flutter/lib/widgets/` — shared UI widgets (matching RN variant components)
  - `variants/flutter/lib/services/` — mock data services
  - `variants/flutter/lib/models/` — data models
  - `variants/flutter/BLOCKERS.md` — category-specific + Flutter-specific blockers (including local Flutter SDK toolchain blocker)
  - Category-specific screens per app type:
    - Meditation/wellness (Headspace, Calm): GuidedSessionScreen, SleepStoriesScreen, FocusScreen, ProgressScreen
    - Running/outdoor (Strava, NRC, Runkeeper, MapMyRun, Komoot, Relive): ActivityScreen, RoutesScreen, StatsScreen, SocialScreen
    - Nutrition (MyFitnessPal): FoodLogScreen, MacrosScreen, WeightScreen, MealPlanScreen
    - Wearable/health (Fitbit, Garmin, Athlytic): DashboardScreen, DeviceScreen, MetricsScreen, ChallengesScreen
    - Connected fitness (Peloton, Zwift): ClassesScreen, WorkoutScreen, LeaderboardScreen, HistoryScreen
    - Gym/strength (NTC, Fitbod, Strong, Hevy): WorkoutBuilderScreen, ExerciseLibraryScreen, ProgressScreen, HistoryScreen
    - Cycling training (TrainerRoad, TrainingPeaks): PlanScreen, ZonesScreen, CalendarScreen, AnalyticsScreen
  - Explicit blockers: Flutter SDK not installed locally (toolchain blocker — `flutter analyze` cannot run), HealthKit/Google Fit platform channels, BLE device pairing, biometric sensors, GPS/location, payment/subscription, push notifications

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Write a Node.js generator script at `/tmp/generate-fitness-flutter-variants.mjs` defining all 20 apps with category-specific Flutter screens/widgets.
  3. For each of the 20 repos, serially: clone to /tmp, create `variants/flutter/` scaffold files, commit, push, verify via `gh api`.
  4. `gh api rate_limit` — record post-scan evidence.
  5. Update `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Repo slugs (20):** Same as Steps 21.2/21.6.
  `headspace-mobile-clone`, `calm-mobile-clone`, `strava-mobile-clone`, `nike-run-club-mobile-clone`, `myfitnesspal-mobile-clone`, `fitbit-mobile-clone`, `peloton-mobile-clone`, `zwift-mobile-clone`, `garmin-connect-mobile-clone`, `nike-training-club-mobile-clone`, `fitbod-mobile-clone`, `strong-mobile-clone`, `hevy-mobile-clone`, `runkeeper-mobile-clone`, `mapmyrun-mobile-clone`, `komoot-mobile-clone`, `relive-mobile-clone`, `trainerroad-mobile-clone`, `trainingpeaks-mobile-clone`, `athlytic-mobile-clone`

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 20 repos have `variants/flutter/` scaffold with `pubspec.yaml`, `analysis_options.yaml`, `lib/main.dart`, `lib/screens/`, `lib/widgets/`, `lib/services/`, `lib/models/`, and `BLOCKERS.md` committed and pushed.
  - Each repo verified PRIVATE with new variant files via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Flutter toolchain blocker documented (local Flutter SDK unavailable — `flutter analyze` cannot run).
  - Category-specific blockers documented per app.

  **Ship-one-step handoff:** Implement only Step 21.10, validate it, then run `/ship` when done.

  **Files:** downstream repos (20), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [x] Step 21.11: Tenth Health & Fitness tranche — Flutter variant for Telehealth, Pharmacy & Health Records (19 apps) (completed 2026-06-05)
  - **Apps:** Same 19 apps from Steps 21.3/21.7: GoodRx (150), Walgreens (151), Zocdoc (152), Teladoc (153), BetterHelp (154), Talkspace (155), Hims & Hers (156), Ro (157), MyChart (658), Doximity (659), CVS Health (660), Express Scripts (661), Amwell (662), MDLIVE (663), Doctor On Demand (664), HealthTap (665), One Medical (666), Carbon Health (667), Maven Clinic (669).

  **What to Build:**
  Flutter variant scaffolds under `variants/flutter/` for each of the 19 downstream repos. Each scaffold includes:
  - `variants/flutter/pubspec.yaml` — Flutter SDK, Dart deps (go_router, provider, http, flutter_svg), dev deps (flutter_test, flutter_lints)
  - `variants/flutter/analysis_options.yaml` — strict Dart lint rules
  - `variants/flutter/lib/main.dart` — app entry point with MaterialApp + GoRouter
  - `variants/flutter/lib/screens/` — HomeScreen and category-specific screens (matching RN variant screens from Step 21.7)
  - `variants/flutter/lib/widgets/` — shared UI widgets
  - `variants/flutter/lib/services/` — mock data services
  - `variants/flutter/lib/models/` — data models
  - `variants/flutter/BLOCKERS.md` — category-specific + Flutter-specific blockers (including Flutter SDK toolchain blocker)
  - Category-specific screens per app type:
    - Prescription pricing (GoodRx): DrugSearchScreen, PriceCompareScreen, CouponScreen, PharmacyFinderScreen
    - Pharmacy (Walgreens, CVS Health): RxManagementScreen, RefillScreen, PharmacyScreen, RewardsScreen
    - Pharmacy benefits (Express Scripts): BenefitsScreen, MailOrderScreen, FormularyScreen
    - Doctor booking (Zocdoc): DoctorSearchScreen, BookingScreen, InsuranceScreen, ReviewsScreen
    - Telehealth (Teladoc, Amwell, MDLIVE, Doctor On Demand, HealthTap): VisitBookingScreen, ConsultationScreen, PrescriptionsScreen, HistoryScreen
    - DTC telehealth (Hims & Hers, Ro): TreatmentScreen, DeliveryScreen, SubscriptionScreen
    - Therapy (BetterHelp, Talkspace): TherapistMatchScreen, SessionScreen, JournalScreen, WorksheetScreen
    - Specialty telehealth (Maven Clinic): ProgramScreen, FertilityScreen, MaternityScreen
    - Primary care (One Medical, Carbon Health): MembershipScreen, AppointmentScreen, MessagingScreen, LabResultsScreen
    - Health records (MyChart): PortalScreen, LabResultsScreen, MedicationsScreen, ImmunizationsScreen
    - Provider network (Doximity): DirectoryScreen, SecureMessageScreen, CMEScreen
  - Explicit blockers: Flutter SDK not installed locally (toolchain blocker), HIPAA compliance, telehealth video/audio (platform channels), e-prescribing (EPCS/DEA), pharmacy dispensing, insurance claims, patient records (HL7 FHIR), therapy licensing, payment processing

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Write a Node.js generator script at `/tmp/generate-telehealth-flutter-variants.mjs` defining all 19 apps with category-specific Flutter screens/widgets/services/models. Follow the same pattern as `/tmp/generate-fitness-flutter-variants.mjs`.
  3. For each of the 19 repos, serially: clone to /tmp, create `variants/flutter/` scaffold files, commit, push, verify via `gh api`.
  4. `gh api rate_limit` — record post-scan evidence.
  5. Update `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Repo slugs (19):**
  `goodrx-mobile-clone`, `walgreens-mobile-clone`, `zocdoc-mobile-clone`, `teladoc-mobile-clone`, `betterhelp-mobile-clone`, `talkspace-mobile-clone`, `hims-and-hers-mobile-clone`, `ro-mobile-clone`, `mychart-mobile-clone`, `doximity-mobile-clone`, `cvs-health-mobile-clone`, `express-scripts-mobile-clone`, `amwell-mobile-clone`, `mdlive-mobile-clone`, `doctor-on-demand-mobile-clone`, `healthtap-mobile-clone`, `one-medical-mobile-clone`, `carbon-health-mobile-clone`, `maven-clinic-mobile-clone`

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 19 repos have `variants/flutter/` scaffold with `pubspec.yaml`, `analysis_options.yaml`, `lib/main.dart`, `lib/screens/`, `lib/widgets/`, `lib/services/`, `lib/models/`, and `BLOCKERS.md` committed and pushed.
  - Each repo verified PRIVATE with new variant files via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Flutter toolchain blocker documented (local Flutter SDK unavailable — `flutter analyze` cannot run).
  - Category-specific blockers documented: HIPAA, telehealth A/V, e-prescribing, pharmacy dispensing, insurance, patient records, therapy licensing.

  **Ship-one-step handoff:** Implement only Step 21.11, validate it, then run `/ship` when done.

  **Files:** downstream repos (19), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [x] Step 21.12: Eleventh Health & Fitness tranche — Flutter variant for Sleep, Nutrition, Wellness & Wearable Platforms (22 apps) (completed 2026-06-05)
  - **Apps:** Same 22 apps from Steps 21.4/21.8: Oura (158), Whoop (159), Sleep Cycle (160), Flo (088), Clue (161), Ovia (162), Nurx (668), Endel (291), Brain.fm (292), Noom (670), Lose It! (671), Cronometer (672), Lifesum (673), WaterMinder (674), Pillow (675), AutoSleep (676), SleepScore (677), Withings Health Mate (678), Samsung Health (679), Apple Health (680), Google Fit (681), Welltory (683).

  **What to Build:**
  Flutter variant scaffolds under `variants/flutter/` for each of the 22 downstream repos. Each scaffold includes:
  - `variants/flutter/pubspec.yaml` — Flutter SDK, Dart deps (go_router, provider, http, flutter_svg), dev deps (flutter_test, flutter_lints)
  - `variants/flutter/analysis_options.yaml` — strict Dart lint rules
  - `variants/flutter/lib/main.dart` — app entry point with MaterialApp + GoRouter
  - `variants/flutter/lib/screens/` — HomeScreen and category-specific screens (matching RN variant screens from Step 21.8)
  - `variants/flutter/lib/widgets/` — shared UI widgets
  - `variants/flutter/lib/services/` — mock data services
  - `variants/flutter/lib/models/` — data models
  - `variants/flutter/BLOCKERS.md` — category-specific + Flutter-specific blockers (including Flutter SDK toolchain blocker)
  - Category-specific screens per app type:
    - Sleep tracking (Oura, Whoop, Sleep Cycle, Pillow, AutoSleep, SleepScore): SleepDashboardScreen, SleepStagesScreen, ReadinessScreen, TrendsScreen, SettingsScreen
    - Women's health (Flo, Clue, Ovia, Nurx): CycleScreen, CalendarScreen, SymptomsScreen, InsightsScreen
    - Wellness audio (Endel, Brain.fm): PlayerScreen, SoundscapeScreen, TimerScreen, LibraryScreen
    - Nutrition (Noom, Lose It!, Cronometer, Lifesum, WaterMinder): DiaryScreen, FoodSearchScreen, NutritionScreen, WeightScreen
    - Wearable platforms (Withings Health Mate, Samsung Health, Apple Health, Google Fit, Welltory): DashboardScreen, DevicesScreen, HealthMetricsScreen, ActivityScreen
  - Explicit blockers: Flutter SDK not installed locally (toolchain blocker), HealthKit/Google Fit platform channels, BLE device pairing (wearables), biometric sensors, reproductive health data privacy (state-specific), AI audio generation, nutrition database licensing, barcode scanner camera API, HRV algorithms, sleep sensor hardware

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Write a Node.js generator script at `/tmp/generate-wellness-flutter-variants.mjs` defining all 22 apps with category-specific Flutter screens/widgets/services/models. Follow the same pattern as `/tmp/generate-fitness-flutter-variants.mjs` and `/tmp/generate-telehealth-flutter-variants.mjs`.
  3. For each of the 22 repos, serially: clone to /tmp, create `variants/flutter/` scaffold files, commit, push, verify via `gh api`.
  4. `gh api rate_limit` — record post-scan evidence.
  5. Update `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Repo slugs (22):**
  `oura-mobile-clone`, `whoop-mobile-clone`, `sleep-cycle-mobile-clone`, `flo-mobile-clone`, `clue-mobile-clone`, `ovia-mobile-clone`, `nurx-mobile-clone`, `endel-mobile-clone`, `brain-fm-mobile-clone`, `noom-mobile-clone`, `lose-it-mobile-clone`, `cronometer-mobile-clone`, `lifesum-mobile-clone`, `waterminder-mobile-clone`, `pillow-mobile-clone`, `autosleep-mobile-clone`, `sleepscore-mobile-clone`, `withings-health-mate-mobile-clone`, `samsung-health-mobile-clone`, `apple-health-mobile-clone`, `google-fit-mobile-clone`, `welltory-mobile-clone`

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 22 repos have `variants/flutter/` scaffold with `pubspec.yaml`, `analysis_options.yaml`, `lib/main.dart`, `lib/screens/`, `lib/widgets/`, `lib/services/`, `lib/models/`, and `BLOCKERS.md` committed and pushed.
  - Each repo verified PRIVATE with new variant files via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Flutter toolchain blocker documented (local Flutter SDK unavailable — `flutter analyze` cannot run).
  - Category-specific blockers documented: HealthKit/Google Fit platform channels, BLE wearable pairing, biometric sensors, reproductive data privacy, AI audio generation, nutrition databases.

  **Ship-one-step handoff:** Implement only Step 21.12, validate it, then run `/ship` when done.

  **Files:** downstream repos (22), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [x] Step 21.13: Twelfth Health & Fitness tranche — Flutter variant for Pregnancy, Parenting, Family Safety & Remaining (21 apps) (completed 2026-06-05)
  - **Apps:** Same 21 apps from Steps 21.5/21.9: BabyCenter (163), Huckleberry (164), Cozi (165), Life360 (166), Bark (167), Qustodio (168), Google Family Link (169), Rise Sleep (684), Pzizz (685), The Bump (686), What to Expect (687), Peanut (688), Find My Kids (689), Family Link (690), OurPact (691), Circle Parental Controls (692), FamCal (693), Winnie (694), Kinedu (695), Sprout Baby (696), FamilyAlbum (697).

  **What to Build:**
  Flutter variant scaffolds under `variants/flutter/` for each of the 21 downstream repos. Each scaffold includes:
  - `variants/flutter/pubspec.yaml` — Flutter SDK, Dart deps (go_router, provider, http, flutter_svg), dev deps (flutter_test, flutter_lints)
  - `variants/flutter/analysis_options.yaml` — strict Dart lint rules
  - `variants/flutter/lib/main.dart` — app entry point with MaterialApp + GoRouter
  - `variants/flutter/lib/screens/` — HomeScreen and category-specific screens (matching RN variant screens from Step 21.9)
  - `variants/flutter/lib/widgets/` — shared UI widgets
  - `variants/flutter/lib/services/` — mock data services
  - `variants/flutter/lib/models/` — data models
  - `variants/flutter/BLOCKERS.md` — category-specific + Flutter-specific blockers (including Flutter SDK toolchain blocker)
  - Category-specific screens per app type:
    - Pregnancy/maternity (BabyCenter, The Bump, What to Expect): WeekByWeekScreen, MilestonesScreen, ArticlesScreen, CommunityScreen
    - Baby tracking (Huckleberry, Sprout Baby, Kinedu): TrackingScreen, ScheduleScreen, MilestonesScreen, ActivitiesScreen
    - Parenting community (Peanut): MatchScreen, GroupsScreen, FeedScreen, EventsScreen
    - Family calendar (Cozi, FamCal): CalendarScreen, ListsScreen, MealPlanScreen, JournalScreen
    - Childcare (Winnie): SearchScreen, ReviewsScreen, WaitlistScreen, CommunityScreen
    - Family safety (Life360, Find My Kids): MapScreen, MembersScreen, PlacesScreen, AlertsScreen
    - Parental monitoring (Bark): MonitorScreen, AlertsScreen, ScreenTimeScreen, LocationScreen
    - Parental controls (Qustodio, Google Family Link, Family Link, OurPact, Circle Parental Controls): DevicesScreen, ScreenTimeScreen, ContentFilterScreen, LocationScreen
    - Sleep optimization (Rise Sleep, Pzizz): SleepDebtScreen, CircadianScreen, SoundsScreen, SessionScreen
    - Family photos (FamilyAlbum): AlbumScreen, MomentsScreen, MembersScreen, SettingsScreen
  - Explicit blockers: Flutter SDK not installed locally (toolchain blocker), COPPA/KOSA child-directed compliance, family GPS location tracking, MDM/device management APIs (platform channels), screen time APIs, social media monitoring, pregnancy health data privacy, AI sleep prediction, algorithmic audio generation, community moderation, photo storage

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Write a Node.js generator script at `/tmp/generate-family-flutter-variants.mjs` defining all 21 apps with category-specific Flutter screens/widgets/services/models. Follow the same pattern as `/tmp/generate-wellness-flutter-variants.mjs`.
  3. For each of the 21 repos, serially: clone to /tmp, create `variants/flutter/` scaffold files, commit, push, verify via `gh api`.
  4. `gh api rate_limit` — record post-scan evidence.
  5. Update `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Repo slugs (21):**
  `babycenter-mobile-clone`, `huckleberry-mobile-clone`, `cozi-mobile-clone`, `life360-mobile-clone`, `bark-mobile-clone`, `qustodio-mobile-clone`, `google-family-link-mobile-clone`, `rise-sleep-mobile-clone`, `pzizz-mobile-clone`, `the-bump-mobile-clone`, `what-to-expect-mobile-clone`, `peanut-mobile-clone`, `find-my-kids-mobile-clone`, `family-link-mobile-clone`, `ourpact-mobile-clone`, `circle-parental-controls-mobile-clone`, `famcal-mobile-clone`, `winnie-mobile-clone`, `kinedu-mobile-clone`, `sprout-baby-mobile-clone`, `familyalbum-mobile-clone`

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 21 repos have `variants/flutter/` scaffold with `pubspec.yaml`, `analysis_options.yaml`, `lib/main.dart`, `lib/screens/`, `lib/widgets/`, `lib/services/`, `lib/models/`, and `BLOCKERS.md` committed and pushed.
  - Each repo verified PRIVATE with new variant files via `gh api`.
  - Rate-limit evidence recorded pre and post.
  - Flutter toolchain blocker documented (local Flutter SDK unavailable — `flutter analyze` cannot run).
  - Category-specific blockers documented: COPPA/KOSA child-directed, family GPS tracking, MDM/device management APIs, screen time APIs, pregnancy health data privacy, AI sleep/audio generation.

  **Ship-one-step handoff:** Implement only Step 21.13, validate it, then run `/ship` when done.

  **Files:** downstream repos (21), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

- [ ] Step 21.14: Remaining variants (Expo + Native iOS/Android) and Phase 21 completion (82 apps) — Tranche 1 (Fitness 20 apps) Expo DONE 2026-06-05, Tranche 2 (Telehealth 19 apps) Expo DONE 2026-06-05, Tranche 3 (Wellness 22 apps) Expo DONE 2026-06-05, Tranche 4 (Family 21 apps) Expo DONE 2026-06-05
  - **Goal:** Build Expo variant scaffolds for all 82 apps (4 tranches matching Steps 21.2-21.5), then document Native iOS (Swift/SwiftUI) and Native Android (Kotlin/Jetpack Compose) as explicitly blocked by local toolchain constraints. Check off all Phase 21 milestone acceptance criteria.

  **What to Build — Expo Variant (variant 4):**
  Each of the 82 downstream repos gets `variants/expo/` scaffold:
  - `variants/expo/package.json` — Expo ~52.0.0, expo-router, @react-navigation, react-native-safe-area-context
  - `variants/expo/tsconfig.json` — strict TypeScript config
  - `variants/expo/app.json` — Expo config with app name/slug
  - `variants/expo/app/` — file-based routing (Expo Router): `_layout.tsx`, `index.tsx`, category-specific tab screens
  - `variants/expo/components/` — shared UI components
  - `variants/expo/services/` — mock data services
  - `variants/expo/hooks/` — custom hooks
  - `variants/expo/BLOCKERS.md` — category + Expo-specific blockers (EAS Build, native modules, etc.)

  **Native Variants (variants 4-5) — Document as Blocked:**
  - Native iOS (Swift/SwiftUI): blocked by Xcode toolchain not available, no iOS Simulator
  - Native Android (Kotlin/Jetpack Compose): blocked by Android SDK/Gradle not available, no Android Emulator
  - Document these blockers in each repo's existing `BLOCKERS.md` or as a summary in `tasks/todo.md`

  **Approach:**
  1. Build Expo variant generator scripts (4 tranches: fitness 20, telehealth 19, wellness 22, family 21) following the same serial pattern as Steps 21.6-21.13.
  2. After all 82 Expo scaffolds verified, document Native iOS/Android blockers.
  3. Check off Phase 21 milestone criteria:
     - 3 working variants (static, RN, Flutter) + 1 Expo variant + 2 explicitly blocked (Native iOS, Native Android) = 5 variants addressed per app
     - Validation evidence from all `gh api` checks
     - Health/workout/content flows rendered in prototypes or explicitly blocked
     - Category-specific risk review consolidated from all steps' BLOCKERS.md files
  4. Archive Phase 21, advance to Phase 22.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 82 repos have `variants/expo/` scaffold with `package.json`, `tsconfig.json`, `app.json`, `app/`, and `BLOCKERS.md`.
  - Native iOS/Android variants documented as blocked by local toolchain constraints.
  - All Phase 21 milestone acceptance criteria checked off.
  - Phase archived to `tasks/phases/phase-21.md`.

  **Ship-one-step handoff:** Implement only Step 21.14 Expo tranche 4 (Family 21 apps), validate it, then run `/ship` when done. After tranche 4, document Native iOS/Android blockers and close out Phase 21.

  **Tranche 4 Implementation Plan (this step):** Expo variant for Pregnancy, Parenting, Family Safety & Remaining (21 apps)

  **Apps (21):** BabyCenter (163), Huckleberry (164), Cozi (165), Life360 (166), Bark (167), Qustodio (168), Google Family Link (169), Rise Sleep (684), Pzizz (685), The Bump (686), What to Expect (687), Peanut (688), Find My Kids (689), Family Link (690), OurPact (691), Circle Parental Controls (692), FamCal (693), Winnie (694), Kinedu (695), Sprout Baby (696), FamilyAlbum (697).

  **Repo slugs (21):** `babycenter-mobile-clone`, `huckleberry-mobile-clone`, `cozi-mobile-clone`, `life360-mobile-clone`, `bark-mobile-clone`, `qustodio-mobile-clone`, `google-family-link-mobile-clone`, `rise-sleep-mobile-clone`, `pzizz-mobile-clone`, `the-bump-mobile-clone`, `what-to-expect-mobile-clone`, `peanut-mobile-clone`, `find-my-kids-mobile-clone`, `family-link-mobile-clone`, `ourpact-mobile-clone`, `circle-parental-controls-mobile-clone`, `famcal-mobile-clone`, `winnie-mobile-clone`, `kinedu-mobile-clone`, `sprout-baby-mobile-clone`, `familyalbum-mobile-clone`

  **What to build per repo:**
  - `variants/expo/package.json` — Expo ~52.0.0, expo-router ~4.0.0, React Navigation
  - `variants/expo/tsconfig.json` — strict TypeScript config
  - `variants/expo/app.json` — Expo config with app name/slug
  - `variants/expo/app/` — file-based routing: `_layout.tsx`, `index.tsx`, category-specific tab screens
  - `variants/expo/components/` — 5 per app, category-specific UI components
  - `variants/expo/services/` — 3-4 per app, mock data services
  - `variants/expo/hooks/` — 3 per app, custom hooks
  - `variants/expo/BLOCKERS.md` — category + Expo-specific blockers (COPPA/KOSA, family GPS, MDM/device APIs, EAS Build)

  **Category-specific tabs:**
  - Pregnancy/maternity (BabyCenter, The Bump, What to Expect): home, weekly, milestones, community, profile
  - Baby tracking (Huckleberry, Sprout Baby, Kinedu): home, tracking, schedule, milestones, profile
  - Parenting community (Peanut): home, discover, groups, events, profile
  - Family calendar (Cozi, FamCal): home, calendar, lists, meals, profile
  - Childcare (Winnie): home, search, reviews, waitlist, profile
  - Family safety (Life360, Find My Kids): home, map, members, places, profile
  - Parental monitoring (Bark): home, monitor, alerts, screentime, profile
  - Parental controls (Qustodio, Google Family Link, Family Link, OurPact, Circle Parental Controls): home, devices, screentime, content, profile
  - Sleep optimization (Rise Sleep, Pzizz): home, sleepdebt, schedule, sounds, profile
  - Family photos (FamilyAlbum): home, albums, moments, members, profile

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. Write Node.js generator at `/tmp/generate-family-expo-variants.mjs` following same pattern as `/tmp/generate-wellness-expo-variants.mjs`.
  3. Serial clone → create `variants/expo/` scaffold → commit → push → verify via `gh api`.
  4. `gh api rate_limit` — record post-scan evidence.
  5. Update `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - All 21 repos have `variants/expo/` scaffold with `package.json`, `tsconfig.json`, `app.json`, `app/_layout.tsx`, `BLOCKERS.md`.
  - Each repo verified PRIVATE, no GitHub Actions.
  - Rate-limit evidence recorded pre and post.
  - Category-specific Expo blockers documented: COPPA/KOSA child-directed compliance, family GPS location tracking (continuous background), MDM/device management APIs, screen time enforcement APIs, social media monitoring, content filtering, pregnancy health data privacy, AI sleep prediction/circadian modeling, algorithmic audio generation, community moderation, photo storage/CDN, geofencing, crash detection, EAS Build for native modules.

  **Ship-one-step handoff:** ~~Implement only Step 21.14 tranche 4 (Family 21 apps), validate it, then run `/ship` when done.~~ DONE 2026-06-05.

  **Files:** downstream repos (21), `tasks/todo.md`, `tasks/repo-seeding.md`, `tasks/history.md`.

  **Next sub-step: Complete Step 21.14 — Document Native iOS/Android blockers + close Phase 21**

  All 4 Expo tranches verified (82/82 apps). Remaining work:

  1. **Document Native iOS/Android variants as blocked** — append to `tasks/todo.md` a consolidated blocker statement for Native iOS (Swift/SwiftUI: Xcode toolchain not available, no iOS Simulator) and Native Android (Kotlin/Jetpack Compose: Android SDK/Gradle not available, no Android Emulator). This documents 5 variants addressed per app: 3 working (static, React Native, Flutter) + 1 Expo + 2 explicitly blocked (Native iOS, Native Android).

  2. **Check off Phase 21 milestone criteria** in `tasks/todo.md`:
     - [x] 82 apps inventory reconciled (done Step 21.1)
     - All 82 apps have 4 working variants + 2 explicitly blocked = 5 variants addressed
     - Validation evidence from all `gh api` checks across 13 steps (21.2-21.14)
     - Health/workout/content flows rendered in prototypes or explicitly blocked in BLOCKERS.md
     - Category-specific risk review documented across all BLOCKERS.md files in downstream repos

  3. **Mark Step 21.14 complete**, archive Phase 21 to `tasks/phases/phase-21.md`, check off Phase 21 milestone in `tasks/roadmap.md`, copy next phase to `tasks/todo.md`.

  **Files:** `tasks/todo.md`, `tasks/roadmap.md`, `tasks/history.md`, `tasks/phases/phase-21.md`.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - Native iOS/Android blockers documented.
  - All Phase 21 milestone criteria checked off.
  - Phase 21 archived to `tasks/phases/phase-21.md`.
  - Next phase loaded into `tasks/todo.md`.

  **Ship-one-step handoff:** Implement only this sub-step (document Native iOS/Android blockers, close Phase 21, archive, advance), validate it, then run `/ship` when done.

### Milestone: Phase 21 — Health, Fitness & Wellness Complete
**Acceptance Criteria:**
- [x] Exact Phase 21 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness (82 apps).
- [ ] All Phase 21 apps have 5 working variants each or explicit local/toolchain/provider/health/regulatory blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] Health data tracking, workout flows, and guided content functional across variants or explicitly blocked by local/provider/health/regulatory constraints.
- [ ] Category-specific risk review for health/medical, telehealth, pharmacy, women's health, child-directed, and family safety features is documented.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 20 archive: `tasks/phases/phase-20.md`

**On Completion** (fill in when phase is done):
- Deviations from plan:
- Tech debt / follow-ups:
- Ready for next phase:
