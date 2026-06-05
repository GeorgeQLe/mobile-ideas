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

- [ ] Step 21.5: Fourth Health & Fitness tranche — Pregnancy, Parenting, Family Safety & Remaining (21 apps)
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
