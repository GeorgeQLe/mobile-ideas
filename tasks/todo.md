# Phase 22: Implementation — Education & Learning (~31 Apps × 5 Variants)

> Test strategy: none
> Source roadmap: `tasks/roadmap.md`

**Goal**: Build all five variants for every app in the Education & Learning cluster.

**Scope**:
- Apps (~31): Language Learning (Duolingo, Babbel, Rosetta Stone, Busuu, ELSA Speak), Translation (Google Translate, DeepL), LMS/Classroom (Canvas Student, Google Classroom, ClassDojo, Remind), Kids Education (Khan Academy Kids, ABCmouse, ScratchJr, Epic!, YouTube Kids, PBS Kids, Khan Academy), Higher Education (Coursera, Quizlet), Math/STEM (Photomath), Writing/Transcription (Grammarly, Otter.ai, Grammarly Keyboard, Wordtune, QuillBot).
- Shared patterns: lesson/course structure, progress tracking, quizzes/assessments, gamification, spaced repetition, video lessons, certificates, speech recognition, translation engines, content moderation for minors.

**Acceptance Criteria:**
- [x] Exact Phase 22 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
- [ ] All Phase 22 apps have 5 working variants each or explicit local/toolchain/provider/education/regulatory blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] Lesson flow, progress tracking, and assessment features functional across variants or explicitly blocked.
- [ ] Category-specific risk review for education, child-directed (COPPA), and academic integrity features is documented.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share lesson structure, gamification, progress tracking, and assessment patterns. Extra care for child-directed content (COPPA/KOSA), academic integrity, and education privacy (FERPA) regulatory blockers.

### Execution Profile
**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low
**Review gates:** inventory correctness, private repo verification, source-spec presence, no GitHub Actions, education/child/privacy regulatory blocker review

### Implementation

- [x] Step 22.1: Reconcile exact Education & Learning app inventory and downstream readiness (~26 apps)
  - Reconcile all ~26 apps across IDs 077-081 (batch-04/05), 170-180 (batch-09), 181-186 (batch-10), 212, 214-216 (batch-11).
  - Serial GitHub API verification: visibility == PRIVATE, default branch == main, README present, source spec present under docs/source-specs/, root commit present, no .github/workflows.
  - Record pre/post rate-limit evidence.
  - Classify risk groups: language learning, translation, LMS/classroom, kids education (COPPA/KOSA), higher education (FERPA), math/STEM, writing/transcription, speech recognition.
  - Document carry-forward blockers: speech recognition APIs, translation APIs/models, LMS integrations (LTI/SCORM), camera OCR (Photomath), video lesson delivery, gamification engines, certificate generation, spaced repetition algorithms, child-directed content (COPPA/KOSA), education privacy (FERPA), academic integrity, content licensing, push notifications, payment/subscription.

  **Candidate App Inventory (26 apps):**

  | ID | App | Repo Slug | Source Spec | Category |
  |---:|---|---|---|---|
  | 077 | Duolingo | `duolingo-mobile-clone` | `specs/batch-04/077-duolingo.md` | Language Learning |
  | 078 | Khan Academy | `khan-academy-mobile-clone` | `specs/batch-04/078-khan-academy.md` | Education Platform |
  | 079 | Quizlet | `quizlet-mobile-clone` | `specs/batch-04/079-quizlet.md` | Study Tools |
  | 080 | Coursera | `coursera-mobile-clone` | `specs/batch-04/080-coursera.md` | Higher Education |
  | 081 | Photomath | `photomath-mobile-clone` | `specs/batch-05/081-photomath.md` | Math/STEM |
  | 170 | ClassDojo | `classdojo-mobile-clone` | `specs/batch-09/170-classdojo.md` | Classroom Tools |
  | 171 | Remind | `remind-mobile-clone` | `specs/batch-09/171-remind.md` | Classroom Messaging |
  | 172 | Canvas Student | `canvas-student-mobile-clone` | `specs/batch-09/172-canvas-student.md` | LMS |
  | 173 | Google Classroom | `google-classroom-mobile-clone` | `specs/batch-09/173-google-classroom.md` | LMS |
  | 174 | ScratchJr | `scratchjr-mobile-clone` | `specs/batch-09/174-scratchjr.md` | Kids Coding |
  | 175 | ABCmouse | `abcmouse-mobile-clone` | `specs/batch-09/175-abcmouse.md` | Kids Education |
  | 176 | Khan Academy Kids | `khan-academy-kids-mobile-clone` | `specs/batch-09/176-khan-academy-kids.md` | Kids Education |
  | 177 | Epic! | `epic-mobile-clone` | `specs/batch-09/177-epic.md` | Kids Reading |
  | 178 | YouTube Kids | `youtube-kids-mobile-clone` | `specs/batch-09/178-youtube-kids.md` | Kids Video |
  | 179 | PBS Kids | `pbs-kids-mobile-clone` | `specs/batch-09/179-pbs-kids.md` | Kids Video |
  | 180 | Babbel | `babbel-mobile-clone` | `specs/batch-09/180-babbel.md` | Language Learning |
  | 181 | Rosetta Stone | `rosetta-stone-mobile-clone` | `specs/batch-10/181-rosetta-stone.md` | Language Learning |
  | 182 | Busuu | `busuu-mobile-clone` | `specs/batch-10/182-busuu.md` | Language Learning |
  | 183 | Google Translate | `google-translate-mobile-clone` | `specs/batch-10/183-google-translate.md` | Translation |
  | 184 | DeepL | `deepl-mobile-clone` | `specs/batch-10/184-deepl.md` | Translation |
  | 185 | Otter.ai | `otter-ai-mobile-clone` | `specs/batch-10/185-otter-ai.md` | Transcription |
  | 186 | Grammarly | `grammarly-mobile-clone` | `specs/batch-10/186-grammarly.md` | Writing Assistant |
  | 212 | ELSA Speak | `elsa-speak-mobile-clone` | `specs/batch-11/212-elsa-speak.md` | Language Learning |
  | 214 | Grammarly Keyboard | `grammarly-keyboard-mobile-clone` | `specs/batch-11/214-grammarly-keyboard.md` | Writing Assistant |
  | 215 | Wordtune | `wordtune-mobile-clone` | `specs/batch-11/215-wordtune.md` | Writing Assistant |
  | 216 | QuillBot | `quillbot-mobile-clone` | `specs/batch-11/216-quillbot.md` | Writing Assistant |

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. For each of the ~26 repos, serially verify via `gh api`: visibility == PRIVATE, default branch == main, README present, source spec present under docs/source-specs/, root commit present, no .github/workflows.
  3. `gh api rate_limit` — record post-scan evidence.
  4. Update `tasks/todo.md` with reconciled inventory, `tasks/repo-seeding.md` with verification evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - Inventory of all Phase 22 apps with IDs, names, repo slugs, spec paths, and downstream repo status.
  - All repos verified PRIVATE with required artifacts.
  - Risk groups and blocker posture documented.
  - Rate-limit evidence recorded.

  **Ship-one-step handoff:** Implement only Step 22.1, validate it, then run `/ship` when done.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`.

- [x] Step 22.2: Remediate unauthorized GitHub Actions workflows in batch-11 repos (4 repos) and build static variant scaffolds for all 26 Education & Learning apps
  - **Part A — Workflow Remediation (4 repos):**
    - Delete `.github/workflows/` directory from 4 batch-11 repos: ELSA Speak (212), Grammarly Keyboard (214), Wordtune (215), QuillBot (216).
    - Serial execution: clone each repo, `git rm -r .github/workflows`, commit with message `chore: remove unauthorized GitHub Actions workflows`, push, verify via `gh api` that `.github/workflows` returns 404.
    - Record pre/post rate-limit evidence.

  - **Part B — Static Variant Scaffolds (26 repos):**
    - Build `variants/static/` scaffold for all 26 Education & Learning downstream repos.
    - Each scaffold: `index.html`, `styles.css`, `app.js`, `README.md` with app-specific screens/features, education-category-specific UI patterns (lesson cards, quiz interfaces, progress bars, course catalogs, translation inputs, writing editors, video players, kid-safe layouts).
    - Generator script pattern: serial clone → scaffold → commit → push → verify.
    - GitHub verification: confirm `variants/static/index.html`, `variants/static/styles.css`, `variants/static/app.js` present, repos still PRIVATE, no `.github/workflows`.
    - Record pre/post rate-limit evidence.

  **Approach:**
  1. `gh api rate_limit` — record pre-run evidence.
  2. Part A: For each of 4 batch-11 repos, serially clone, remove workflows, commit, push, verify.
  3. Part B: Generate static variant scaffolds for all 26 repos with education-category-specific content.
  4. `gh api rate_limit` — record post-run evidence.
  5. Update `tasks/todo.md` with results, `tasks/repo-seeding.md` with verification evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - 4 batch-11 repos have `.github/workflows` removed and verified absent (HTTP 404).
  - 26 repos have `variants/static/` with index.html, styles.css, app.js.
  - All repos remain PRIVATE with no GitHub Actions.
  - Rate-limit evidence recorded.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`, 26 downstream repos (`variants/static/`), 4 downstream repos (`.github/workflows` deletion).

  **Ship-one-step handoff:** Implement only Step 22.2, validate it, then run `/ship` when done.

  **Step 22.2 Results (2026-06-05):**
  - **Part A — Workflow Remediation:** 4/4 batch-11 repos remediated. `.github/workflows` removed from ELSA Speak (212), Grammarly Keyboard (214), Wordtune (215), QuillBot (216). All verified 404 via GitHub API.
  - **Part B — Static Variant Scaffolds:** 26/26 repos scaffolded with `variants/static/` (index.html, styles.css, app.js, README.md). Each scaffold has category-specific UI: language-learning (lesson cards, quiz interfaces, XP/streak metrics), translation (text/camera/conversation inputs), classroom/LMS (course lists, assignments, grades, calendars), kids-education (kid-safe cards, progress bars, parent dashboards), kids-media (video players, parental controls, character collections), education-platform (mastery progress, practice exercises), higher-education (course catalogs, flashcards, certificates), math/STEM (camera scan, step-by-step solutions, graphing), transcription (recording, transcripts, AI summaries), writing-assistant (editors, suggestions, paraphrasing modes).
  - **Verification:** 26/26 pass. All repos PRIVATE, static files present, no `.github/workflows`.
  - **Rate-limit evidence:** pre-run core used=0/remaining=5000; post-run core used=134/remaining=4866. No rate-limit violations.
  - **Generator script:** `/tmp/generate-education-prototypes.mjs`.
  - Full evidence in `tasks/repo-seeding.md` under "Phase 22 Step 22.2".

  **Step 22.1 Results (2026-06-05):**
  - 26 apps verified across IDs 077-081, 170-186, 212, 214-216.
  - All 26 repos: PRIVATE, default branch `main`, README present, source spec present, root commit present.
  - 22/26 repos workflow-clean. 4 batch-11 repos (212, 214-216) have unauthorized `.github/workflows` requiring remediation.
  - Risk groups documented: Language Learning (5), Translation (2), LMS/Classroom (4), Kids Education (3), Kids Media (3), Education Platform (1), Higher Education (2), Math/STEM (1), Writing/Transcription (4), Writing Assistant (1), Classroom Messaging (1), Classroom Tools (1).
  - Carry-forward blockers: COPPA/KOSA (kids apps), FERPA (LMS/classroom), speech recognition APIs, translation APIs/models, LMS integrations (LTI/SCORM), camera OCR, video delivery, NLP/AI models, custom keyboard APIs, academic integrity, content licensing, subscription tiers.
  - Rate-limit evidence: pre-scan core used=604/remaining=4396; post-scan core used=743/remaining=4257. No rate-limit violations.
  - Full evidence in `tasks/repo-seeding.md` under "Phase 22 Step 22.1".

- [x] Step 22.3: Build React Native variant scaffolds for all 26 Education & Learning apps
  - Build `variants/react-native/` scaffold for all 26 Education & Learning downstream repos.
  - Each scaffold: `package.json` (Expo ~52.0.0 + React Navigation), `tsconfig.json` (strict), `app.json` (Expo config), `index.js` (entry), `src/screens/` (5 category-specific screens per app), `src/components/` (5 shared components), `src/navigation/AppNavigator.js` (bottom tab navigator), `src/services/` (3-4 mock data services), `src/hooks/` (3 custom hooks), `BLOCKERS.md` (category-specific + RN-specific blockers).
  - Education-category-specific screens: language-learning (LessonScreen, PracticeScreen, LeaderboardScreen, ProfileScreen, ReviewScreen), translation (TranslateScreen, CameraScreen, ConversationScreen, HistoryScreen, SettingsScreen), classroom/LMS (CourseListScreen, AssignmentScreen, GradeScreen, CalendarScreen, MessageScreen), kids-education (LearningPathScreen, GameScreen, CreativeScreen, ProgressScreen, ParentScreen), kids-media (LibraryScreen, PlayerScreen, CollectionScreen, ParentControlScreen, ProfileScreen), education-platform (CourseScreen, PracticeScreen, ProgressScreen, ClassroomScreen, SearchScreen), higher-education (CatalogScreen, StudyScreen, AssessScreen, CertificateScreen, ProfileScreen), math/STEM (CameraScreen, SolutionScreen, GraphScreen, HistoryScreen, SettingsScreen), transcription (RecordScreen, TranscriptScreen, SummaryScreen, SearchScreen, SettingsScreen), writing-assistant (EditorScreen, SuggestionScreen, ToolsScreen, StatsScreen, SettingsScreen).
  - Generator script pattern: serial clone → pull latest → scaffold → commit → push → verify.
  - GitHub verification: confirm `variants/react-native/package.json`, `app.json`, `index.js`, `src/navigation/AppNavigator.js` present, repos still PRIVATE, no `.github/workflows`.
  - Record pre/post rate-limit evidence.

  **Approach:**
  1. `gh api rate_limit` — record pre-run evidence.
  2. Build generator script at `/tmp/generate-education-rn-variants.mjs` following Phase 21 fitness/telehealth RN variant pattern.
  3. Serial execution: for each of 26 repos, clone/pull → scaffold → commit → push → verify.
  4. `gh api rate_limit` — record post-run evidence.
  5. Update `tasks/todo.md` with results, `tasks/repo-seeding.md` with verification evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - 26 repos have `variants/react-native/` with package.json, app.json, index.js, AppNavigator, screens, components, services, hooks, BLOCKERS.md.
  - All repos remain PRIVATE with no GitHub Actions.
  - Rate-limit evidence recorded.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`, 26 downstream repos (`variants/react-native/`).

  **Ship-one-step handoff:** Implement only Step 22.3, validate it, then run `/ship` when done.

  **Step 22.3 Results (2026-06-05):**
  - **React Native Variant Scaffolds:** 26/26 repos scaffolded with `variants/react-native/` (package.json, tsconfig.json, app.json, index.js, src/screens/, src/components/, src/navigation/AppNavigator.js, src/services/, src/hooks/, BLOCKERS.md).
  - Each scaffold uses Expo ~52.0.0 + React Navigation v7 with 5 category-specific screens, 5 shared components, 3-4 mock data services, 3 custom hooks, and category-specific + RN-specific blockers.
  - Categories covered: language-learning (5 apps — Duolingo, Babbel, Rosetta Stone, Busuu, ELSA Speak), education-platform (1 — Khan Academy), higher-education (2 — Quizlet, Coursera), math-stem (1 — Photomath), classroom (2 — ClassDojo, Remind), lms (2 — Canvas Student, Google Classroom), kids-education (3 — ScratchJr, ABCmouse, Khan Academy Kids), kids-media (3 — Epic!, YouTube Kids, PBS Kids), translation (2 — Google Translate, DeepL), transcription (1 — Otter.ai), writing-assistant (4 — Grammarly, Grammarly Keyboard, Wordtune, QuillBot).
  - **Verification:** 26/26 pass. All repos PRIVATE, RN files present (package.json, app.json, index.js, AppNavigator.js, BLOCKERS.md), no `.github/workflows`.
  - **Rate-limit evidence:** pre-run core used=134/remaining=4866; post-run core used=420/remaining=4580. No rate-limit violations.
  - **Generator script:** `/tmp/generate-education-rn-variants.mjs`.
  - Full evidence in `tasks/repo-seeding.md` under "Phase 22 Step 22.3".

- [x] Step 22.4: Build Flutter variant scaffolds for all 26 Education & Learning apps
  - Build `variants/flutter/` scaffold for all 26 Education & Learning downstream repos.
  - Each scaffold: `pubspec.yaml` (Flutter SDK ^3.24.0, go_router, provider, http, shared_preferences), `analysis_options.yaml` (flutter_lints), `lib/main.dart` (entry + MaterialApp + GoRouter), `lib/screens/` (5 category-specific screens per app), `lib/widgets/` (5 shared widgets), `lib/services/` (3-4 mock data services), `lib/models/` (2-3 data models), `lib/providers/` (2-3 state providers), `BLOCKERS.md` (category-specific + Flutter-specific blockers).
  - Education-category-specific screens: language-learning (LessonScreen, PracticeScreen, LeaderboardScreen, ProfileScreen, ReviewScreen), translation (TranslateScreen, CameraScreen, ConversationScreen, HistoryScreen, SettingsScreen), classroom/LMS (CourseListScreen, AssignmentScreen, GradeScreen, CalendarScreen, MessageScreen), kids-education (LearningPathScreen, GameScreen, CreativeScreen, ProgressScreen, ParentScreen), kids-media (LibraryScreen, PlayerScreen, CollectionScreen, ParentControlScreen, ProfileScreen), education-platform (CourseScreen, PracticeScreen, ProgressScreen, ClassroomScreen, SearchScreen), higher-education (CatalogScreen, StudyScreen, AssessScreen, CertificateScreen, ProfileScreen), math/STEM (CameraScreen, SolutionScreen, GraphScreen, HistoryScreen, SettingsScreen), transcription (RecordScreen, TranscriptScreen, SummaryScreen, SearchScreen, SettingsScreen), writing-assistant (EditorScreen, SuggestionScreen, ToolsScreen, StatsScreen, SettingsScreen).
  - Generator script at `/tmp/generate-education-flutter-variants.mjs` following Phase 21 Flutter pattern.
  - Serial GitHub API verification post-scaffold.
  - Record pre/post rate-limit evidence.

  **Approach:**
  1. `gh api rate_limit` — record pre-run evidence.
  2. Build generator script at `/tmp/generate-education-flutter-variants.mjs` following Phase 21 fitness/telehealth Flutter variant pattern.
  3. Serial execution: for each of 26 repos, clone/pull → scaffold → commit → push → verify.
  4. `gh api rate_limit` — record post-run evidence.
  5. Update `tasks/todo.md` with results, `tasks/repo-seeding.md` with verification evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - 26 repos have `variants/flutter/` with pubspec.yaml, lib/main.dart, screens, widgets, services, models, providers, BLOCKERS.md.
  - All repos remain PRIVATE with no GitHub Actions.
  - Rate-limit evidence recorded.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`, 26 downstream repos (`variants/flutter/`).

  **Ship-one-step handoff:** Implement only Step 22.4, validate it, then run `/ship` when done.

  **Step 22.4 Results (2026-06-05):**
  - **Flutter Variant Scaffolds:** 26/26 repos scaffolded with `variants/flutter/` (pubspec.yaml, analysis_options.yaml, lib/main.dart, lib/screens/, lib/widgets/, lib/services/, lib/models/, lib/providers/, BLOCKERS.md).
  - Each scaffold uses Flutter SDK >=3.24.0 + GoRouter + Provider with 5 category-specific screens, 5 shared widgets, 3-4 mock data services, 2-3 data models, 2-3 state providers, and category-specific + Flutter-specific blockers.
  - Categories covered: language-learning (5 apps — Duolingo, Babbel, Rosetta Stone, Busuu, ELSA Speak), education-platform (1 — Khan Academy), higher-education (2 — Quizlet, Coursera), math-stem (1 — Photomath), classroom (2 — ClassDojo, Remind), lms (2 — Canvas Student, Google Classroom), kids-education (3 — ScratchJr, ABCmouse, Khan Academy Kids), kids-media (3 — Epic!, YouTube Kids, PBS Kids), translation (2 — Google Translate, DeepL), transcription (1 — Otter.ai), writing-assistant (4 — Grammarly, Grammarly Keyboard, Wordtune, QuillBot).
  - **Verification:** 26/26 pass. All repos PRIVATE, Flutter files present (pubspec.yaml, lib/main.dart, BLOCKERS.md), no `.github/workflows`.
  - **Rate-limit evidence:** pre-run core used=30/remaining=4970; post-run core used=160/remaining=4840. No rate-limit violations.
  - **Generator script:** `/tmp/generate-education-flutter-variants.mjs`.
  - Full evidence in `tasks/repo-seeding.md` under "Phase 22 Step 22.4".

- [x] Step 22.5: Build Expo variant scaffolds for all 26 Education & Learning apps
  - Build `variants/expo/` scaffold for all 26 Education & Learning downstream repos.
  - Each scaffold: `package.json` (Expo ~52.0.0, expo-router, expo-status-bar, react-native-safe-area-context), `tsconfig.json` (strict), `app.json` (Expo config with expo-router scheme), `app/_layout.tsx` (root layout with tabs), `app/(tabs)/` (5 category-specific tab screens per app), `src/components/` (5 shared components), `src/services/` (3-4 mock data services), `src/hooks/` (3 custom hooks), `src/stores/` (2-3 state stores), `BLOCKERS.md` (category-specific + Expo-specific blockers).
  - Education-category-specific screens match the RN/Flutter pattern: language-learning (lesson, practice, leaderboard, profile, review), translation (translate, camera, conversation, history, settings), classroom/LMS (course-list, assignment, grade, calendar, message), kids-education (learning-path, game, creative, progress, parent), kids-media (library, player, collection, parent-control, profile), education-platform (course, practice, progress, classroom, search), higher-education (catalog, study, assess, certificate, profile), math/STEM (camera, solution, graph, history, settings), transcription (record, transcript, summary, search, settings), writing-assistant (editor, suggestion, tools, stats, settings).
  - Key difference from RN variant: uses Expo Router (file-based routing) instead of React Navigation, TypeScript throughout (.tsx), `app/` directory convention.
  - Generator script at `/tmp/generate-education-expo-variants.mjs` following Phase 21 Expo pattern.
  - Serial GitHub API verification post-scaffold.
  - Record pre/post rate-limit evidence.

  **Approach:**
  1. `gh api rate_limit` — record pre-run evidence.
  2. Build generator script at `/tmp/generate-education-expo-variants.mjs` following Phase 21 fitness/telehealth Expo variant pattern.
  3. Serial execution: for each of 26 repos, clone/pull → scaffold → commit → push → verify.
  4. `gh api rate_limit` — record post-run evidence.
  5. Update `tasks/todo.md` with results, `tasks/repo-seeding.md` with verification evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - 26 repos have `variants/expo/` with package.json, app.json, tsconfig.json, app/_layout.tsx, tab screens, components, services, hooks, stores, BLOCKERS.md.
  - All repos remain PRIVATE with no GitHub Actions.
  - Rate-limit evidence recorded.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`, 26 downstream repos (`variants/expo/`).

  **Ship-one-step handoff:** Implement only Step 22.5, validate it, then run `/ship` when done.

  **Step 22.5 Results (2026-06-05):**
  - **Expo Variant Scaffolds:** 26/26 repos scaffolded with `variants/expo/` (package.json, tsconfig.json, app.json, app/_layout.tsx, app/(tabs)/_layout.tsx, app/(tabs)/index.tsx, app/(tabs)/*.tsx, src/components/, src/services/, src/hooks/, src/stores/, BLOCKERS.md).
  - Each scaffold uses Expo ~52.0.0 + Expo Router ~4.0.0 with file-based routing, TypeScript throughout, 5 category-specific tab screens, 5 shared components, 3-4 mock data services, 3 custom hooks, 2-3 state stores, and category-specific + Expo-specific blockers.
  - Key difference from RN variant: Expo Router (file-based routing in `app/` directory) instead of React Navigation, TypeScript `.tsx` files, state stores (`src/stores/`) for state management.
  - Categories covered: language-learning (5 apps — Duolingo, Babbel, Rosetta Stone, Busuu, ELSA Speak), education-platform (1 — Khan Academy), higher-education (2 — Quizlet, Coursera), math-stem (1 — Photomath), classroom (2 — ClassDojo, Remind), lms (2 — Canvas Student, Google Classroom), kids-education (3 — ScratchJr, ABCmouse, Khan Academy Kids), kids-media (3 — Epic!, YouTube Kids, PBS Kids), translation (2 — Google Translate, DeepL), transcription (1 — Otter.ai), writing-assistant (4 — Grammarly, Grammarly Keyboard, Wordtune, QuillBot).
  - **Verification:** 26/26 pass. All repos PRIVATE, Expo files present (package.json, app.json, tsconfig.json, app/(tabs)/_layout.tsx, BLOCKERS.md), no `.github/workflows`.
  - **Rate-limit evidence:** pre-run core used=160/remaining=4840; post-run core used=342/remaining=4658. No rate-limit violations.
  - **Generator script:** `/tmp/generate-education-expo-variants.mjs`.
  - Full evidence in `tasks/repo-seeding.md` under "Phase 22 Step 22.5".

- [ ] Step 22.6: Build iOS Native (SwiftUI) variant scaffolds for all 26 Education & Learning apps
  - Build `variants/ios-native/` scaffold for all 26 Education & Learning downstream repos.
  - Each scaffold: `Package.swift` (swift-tools-version 6.0, iOS 17+), `Sources/App/<AppName>App.swift` (SwiftUI @main App with TabView), `Sources/Views/` (5 category-specific tab views per app), `Sources/Components/` (5 shared components), `Sources/Services/` (3-4 mock data services), `Sources/Models/` (2-3 data models with Codable/Identifiable), `Sources/ViewModels/` (2-3 @Observable view models), `BLOCKERS.md` (category-specific + iOS-specific blockers).
  - Education-category-specific views match the RN/Flutter/Expo pattern: language-learning (LessonView, PracticeView, LeaderboardView, ProfileView, ReviewView), translation (TranslateView, CameraView, ConversationView, HistoryView, SettingsView), classroom/LMS (CourseListView, AssignmentView, GradeView, CalendarView, MessageView), kids-education (LearningPathView, GameView, CreativeView, ProgressView, ParentView), kids-media (LibraryView, PlayerView, CollectionView, ParentControlView, ProfileView), education-platform (CourseView, PracticeView, ProgressView, ClassroomView, SearchView), higher-education (CatalogView, StudyView, AssessView, CertificateView, ProfileView), math/STEM (CameraView, SolutionView, GraphView, HistoryView, SettingsView), transcription (RecordView, TranscriptView, SummaryView, SearchView, SettingsView), writing-assistant (EditorView, SuggestionView, ToolsView, StatsView, SettingsView).
  - Key differences from cross-platform variants: SwiftUI with @Observable (iOS 17+ Observation framework), TabView with native tab bar, NavigationStack, Swift Package Manager, Swift 6 strict concurrency.
  - Generator script at `/tmp/generate-education-ios-variants.mjs` — generates Swift source files, serial clone → scaffold → commit → push → verify.
  - Serial GitHub API verification post-scaffold.
  - Record pre/post rate-limit evidence.

  **Approach:**
  1. `gh api rate_limit` — record pre-run evidence.
  2. Build generator script at `/tmp/generate-education-ios-variants.mjs`.
  3. Serial execution: for each of 26 repos, clone/pull → scaffold → commit → push → verify.
  4. `gh api rate_limit` — record post-run evidence.
  5. Update `tasks/todo.md` with results, `tasks/repo-seeding.md` with verification evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - 26 repos have `variants/ios-native/` with Package.swift, App entry, Views, Components, Services, Models, ViewModels, BLOCKERS.md.
  - All repos remain PRIVATE with no GitHub Actions.
  - Rate-limit evidence recorded.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`, 26 downstream repos (`variants/ios-native/`).

  **Ship-one-step handoff:** Implement only Step 22.6, validate it, then run `/ship` when done.

- [ ] Step 22.7: Build Android Native (Kotlin/Jetpack Compose) variant scaffolds for all 26 Education & Learning apps

### Milestone: Phase 22 — Education & Learning Complete
**Acceptance Criteria:**
- [ ] Exact Phase 22 inventory reconciled.
- [ ] All apps have 5 variants addressed or explicit blockers.
- [ ] Every variant passes validation with evidence recorded.
- [ ] Lesson/assessment flows functional or explicitly blocked.
- [ ] Category-specific risk review documented.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 21 archive: `tasks/phases/phase-21.md`

**On Completion** (fill in when phase is done):
- Deviations from plan:
- Tech debt / follow-ups:
- Ready for next phase:
