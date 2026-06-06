# Phase 23: Implementation — Productivity & Collaboration (~72 Apps × 5 Variants)

> Test strategy: none
> Source roadmap: `tasks/roadmap.md`

**Goal**: Build all five variants for every app in the Productivity & Collaboration cluster.

**Scope**:
- Apps (~73): Task management (Notion, Todoist, Trello, Coda, Airtable), Documents (Google Docs/Sheets/Slides, Microsoft Word/Excel/PowerPoint/365, Apple Pages/Numbers/Keynote, OneNote, Roam Research), Notes (Obsidian, Bear, iA Writer, Ulysses, Craft, Logseq, Standard Notes, Joplin, Simplenote, Notesnook, Anytype), Calendar/Scheduling (Google Calendar, Calendly, Fantastical, Doodle, BusyCal, Timepage, Calendars by Readdle, Proton Calendar, Cal.com, SavvyCal, Acuity Scheduling, Square Appointments, Vagaro, Mindbody, Fresha, Booksy, StyleSeat, Schedulicity, Setmore), Cloud Storage (Dropbox, Google Drive, Box, OneDrive, iCloud Drive, MEGA, pCloud, Sync.com, WeTransfer), Document Scanning (CamScanner, Genius Scan, Scanner Pro, Adobe Scan, Microsoft Lens, Adobe Acrobat Reader, DocuSign), Email (Gmail, Outlook), Creator Tools (CapCut, Canva, Lightroom), Design (Figma), AI Assistant (Monica).
- Shared patterns: CRUD with real-time sync, drag-and-drop, rich text editing, calendar views, file management, sharing/permissions, offline support.

**Acceptance Criteria:**
- [ ] Exact Phase 23 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
- [ ] All Phase 23 apps have 5 working variants each or explicit local/toolchain/provider/productivity/regulatory blockers.
- [ ] Every variant passes validation and has benchmark or local validation score evidence recorded.
- [ ] CRUD, sync, and collaboration features functional across variants or explicitly blocked.
- [ ] Category-specific risk review for productivity, document editing, cloud storage, scheduling, and creator tools is documented.

**Parallelization:** agent-team

**Coordination Notes:** Independent repos. Share real-time sync, rich text editing, file management, calendar, and drag-and-drop patterns. Extra care for document format compatibility, cloud storage quotas, calendar API integrations, payment/booking flows, and creator tool media pipelines.

### Execution Profile
**Parallel mode:** serial
**Integration owner:** main agent
**Conflict risk:** low
**Review gates:** inventory correctness, private repo verification, source-spec presence, no GitHub Actions, productivity/scheduling/storage/creator regulatory blocker review

### Implementation

- [x] Step 23.1: Reconcile exact Productivity & Collaboration app inventory and downstream readiness (~73 apps) ✅ 2026-06-06
  - Reconcile all ~73 apps across IDs from batches 02, 03, 05, 10, 36, 37, 38, 39.
  - Serial GitHub API verification: visibility == PRIVATE, default branch == main, README present, source spec present under docs/source-specs/, root commit present, no .github/workflows.
  - Record pre/post rate-limit evidence.
  - Classify risk groups: task-management, notes-knowledge, documents-office, calendar-scheduling, cloud-storage, document-scanning, email, creator-tools, design-collaboration, ai-assistant.
  - Document carry-forward blockers: real-time sync/collaboration (CRDT/OT), rich text editing engines, calendar API integrations (Google Calendar API, CalDAV), cloud storage APIs (Google Drive API, Dropbox API, OneDrive API), document format handling (DOCX, XLSX, PDF), media processing pipelines (video editing, image editing), booking/payment flows, OCR/document scanning, email APIs (IMAP/SMTP), AI/NLP models, offline sync, file sharing/permissions.

  **Candidate App Inventory (~73 apps):**

  | ID | App | Repo Slug | Source Spec | Category |
  |---:|---|---|---|---|
  | 024 | Gmail | `gmail-mobile-clone` | `specs/batch-02/024-gmail.md` | Email |
  | 025 | Outlook | `outlook-mobile-clone` | `specs/batch-02/025-outlook.md` | Email |
  | 089 | Notion | `notion-mobile-clone` | `specs/batch-05/089-notion.md` | Task Management |
  | 090 | Todoist | `todoist-mobile-clone` | `specs/batch-05/090-todoist.md` | Task Management |
  | 091 | Trello | `trello-mobile-clone` | `specs/batch-05/091-trello.md` | Task Management |
  | 092 | Google Calendar | `google-calendar-mobile-clone` | `specs/batch-05/092-google-calendar.md` | Calendar |
  | 093 | Evernote | `evernote-mobile-clone` | `specs/batch-05/093-evernote.md` | Notes |
  | 094 | Dropbox | `dropbox-mobile-clone` | `specs/batch-05/094-dropbox.md` | Cloud Storage |
  | 095 | Google Drive | `google-drive-mobile-clone` | `specs/batch-05/095-google-drive.md` | Cloud Storage |
  | 096 | CapCut | `capcut-mobile-clone` | `specs/batch-05/096-capcut.md` | Creator Tools |
  | 097 | Canva | `canva-mobile-clone` | `specs/batch-05/097-canva.md` | Creator Tools |
  | 098 | Lightroom | `lightroom-mobile-clone` | `specs/batch-05/098-lightroom.md` | Creator Tools |
  | 183 | Google Translate | `google-translate-mobile-clone` | `specs/batch-10/183-google-translate.md` | Translation |
  | 184 | DeepL | `deepl-mobile-clone` | `specs/batch-10/184-deepl.md` | Translation |
  | 192 | Figma | `figma-mobile-clone` | `specs/batch-10/192-figma.md` | Design |
  | 194 | Calendly | `calendly-mobile-clone` | `specs/batch-10/194-calendly.md` | Calendar/Scheduling |
  | 195 | Fantastical | `fantastical-mobile-clone` | `specs/batch-10/195-fantastical.md` | Calendar |
  | 197 | Obsidian | `obsidian-mobile-clone` | `specs/batch-10/197-obsidian.md` | Notes |
  | 198 | Bear | `bear-mobile-clone` | `specs/batch-10/198-bear.md` | Notes |
  | 219 | Monica | `monica-mobile-clone` | `specs/batch-03/219-monica.md` | AI Assistant |
  | 720 | Microsoft 365 | `microsoft-365-mobile-clone` | `specs/batch-36/720-microsoft-365.md` | Office Suite |
  | 721 | Google Docs | `google-docs-mobile-clone` | `specs/batch-37/721-google-docs.md` | Documents |
  | 722 | Google Sheets | `google-sheets-mobile-clone` | `specs/batch-37/722-google-sheets.md` | Documents |
  | 723 | Google Slides | `google-slides-mobile-clone` | `specs/batch-37/723-google-slides.md` | Documents |
  | 724 | Microsoft Word | `microsoft-word-mobile-clone` | `specs/batch-37/724-microsoft-word.md` | Documents |
  | 725 | Microsoft Excel | `microsoft-excel-mobile-clone` | `specs/batch-37/725-microsoft-excel.md` | Documents |
  | 726 | Microsoft PowerPoint | `microsoft-powerpoint-mobile-clone` | `specs/batch-37/726-microsoft-powerpoint.md` | Documents |
  | 727 | OneNote | `onenote-mobile-clone` | `specs/batch-37/727-onenote.md` | Notes |
  | 728 | Apple Pages | `apple-pages-mobile-clone` | `specs/batch-37/728-apple-pages.md` | Documents |
  | 729 | Apple Numbers | `apple-numbers-mobile-clone` | `specs/batch-37/729-apple-numbers.md` | Documents |
  | 730 | Apple Keynote | `apple-keynote-mobile-clone` | `specs/batch-37/730-apple-keynote.md` | Documents |
  | 731 | iA Writer | `ia-writer-mobile-clone` | `specs/batch-37/731-ia-writer.md` | Notes |
  | 732 | Ulysses | `ulysses-mobile-clone` | `specs/batch-37/732-ulysses.md` | Notes |
  | 733 | Craft | `craft-mobile-clone` | `specs/batch-37/733-craft.md` | Notes |
  | 734 | Roam Research | `roam-research-mobile-clone` | `specs/batch-37/734-roam-research.md` | Notes |
  | 735 | Logseq | `logseq-mobile-clone` | `specs/batch-37/735-logseq.md` | Notes |
  | 736 | Standard Notes | `standard-notes-mobile-clone` | `specs/batch-37/736-standard-notes.md` | Notes |
  | 737 | Joplin | `joplin-mobile-clone` | `specs/batch-37/737-joplin.md` | Notes |
  | 738 | Simplenote | `simplenote-mobile-clone` | `specs/batch-37/738-simplenote.md` | Notes |
  | 739 | Notesnook | `notesnook-mobile-clone` | `specs/batch-37/739-notesnook.md` | Notes |
  | 740 | Anytype | `anytype-mobile-clone` | `specs/batch-37/740-anytype.md` | Notes |
  | 741 | Coda | `coda-mobile-clone` | `specs/batch-37/741-coda.md` | Task Management |
  | 742 | Airtable | `airtable-mobile-clone` | `specs/batch-37/742-airtable.md` | Task Management |
  | 743 | CamScanner | `camscanner-mobile-clone` | `specs/batch-38/743-camscanner.md` | Document Scanning |
  | 744 | Genius Scan | `genius-scan-mobile-clone` | `specs/batch-38/744-genius-scan.md` | Document Scanning |
  | 745 | Scanner Pro | `scanner-pro-mobile-clone` | `specs/batch-38/745-scanner-pro.md` | Document Scanning |
  | 762 | Doodle | `doodle-mobile-clone` | `specs/batch-39/762-doodle.md` | Calendar/Scheduling |
  | 763 | BusyCal | `busycal-mobile-clone` | `specs/batch-39/763-busycal.md` | Calendar |
  | 764 | Timepage | `timepage-mobile-clone` | `specs/batch-39/764-timepage.md` | Calendar |
  | 765 | Calendars by Readdle | `calendars-by-readdle-mobile-clone` | `specs/batch-39/765-calendars-by-readdle.md` | Calendar |
  | 766 | Proton Calendar | `proton-calendar-mobile-clone` | `specs/batch-39/766-proton-calendar.md` | Calendar |
  | 767 | Cal.com | `cal-com-mobile-clone` | `specs/batch-39/767-cal-com.md` | Calendar/Scheduling |
  | 768 | SavvyCal | `savvycal-mobile-clone` | `specs/batch-39/768-savvycal.md` | Calendar/Scheduling |
  | 769 | Acuity Scheduling | `acuity-scheduling-mobile-clone` | `specs/batch-39/769-acuity-scheduling.md` | Scheduling |
  | 770 | Square Appointments | `square-appointments-mobile-clone` | `specs/batch-39/770-square-appointments.md` | Scheduling |
  | 771 | Vagaro | `vagaro-mobile-clone` | `specs/batch-39/771-vagaro.md` | Scheduling |
  | 772 | Mindbody | `mindbody-mobile-clone` | `specs/batch-39/772-mindbody.md` | Scheduling |
  | 773 | Fresha | `fresha-mobile-clone` | `specs/batch-39/773-fresha.md` | Scheduling |
  | 774 | Booksy | `booksy-mobile-clone` | `specs/batch-39/774-booksy.md` | Scheduling |
  | 775 | StyleSeat | `styleseat-mobile-clone` | `specs/batch-39/775-styleseat.md` | Scheduling |
  | 776 | Schedulicity | `schedulicity-mobile-clone` | `specs/batch-39/776-schedulicity.md` | Scheduling |
  | 777 | Setmore | `setmore-mobile-clone` | `specs/batch-39/777-setmore.md` | Scheduling |
  | 778 | Box | `box-mobile-clone` | `specs/batch-39/778-box.md` | Cloud Storage |
  | 779 | OneDrive | `onedrive-mobile-clone` | `specs/batch-39/779-onedrive.md` | Cloud Storage |
  | 780 | iCloud Drive | `icloud-drive-mobile-clone` | `specs/batch-39/780-icloud-drive.md` | Cloud Storage |
  | 781 | MEGA | `mega-mobile-clone` | `specs/batch-39/781-mega.md` | Cloud Storage |
  | 782 | pCloud | `pcloud-mobile-clone` | `specs/batch-39/782-pcloud.md` | Cloud Storage |
  | 783 | Sync.com | `sync-com-mobile-clone` | `specs/batch-39/783-sync-com.md` | Cloud Storage |
  | 784 | WeTransfer | `wetransfer-mobile-clone` | `specs/batch-39/784-wetransfer.md` | Cloud Storage |
  | 785 | Adobe Acrobat Reader | `adobe-acrobat-reader-mobile-clone` | `specs/batch-39/785-adobe-acrobat-reader.md` | Document Scanning |
  | 786 | DocuSign | `docusign-mobile-clone` | `specs/batch-39/786-docusign.md` | Document Scanning |
  | 787 | Adobe Scan | `adobe-scan-mobile-clone` | `specs/batch-39/787-adobe-scan.md` | Document Scanning |
  | 788 | Microsoft Lens | `microsoft-lens-mobile-clone` | `specs/batch-39/788-microsoft-lens.md` | Document Scanning |

  **Approach:**
  1. `gh api rate_limit` — record pre-scan evidence.
  2. For each of the ~73 repos, serially verify via `gh api`: visibility == PRIVATE, default branch == main, README present, source spec present under docs/source-specs/, root commit present, no .github/workflows.
  3. `gh api rate_limit` — record post-scan evidence.
  4. Update `tasks/todo.md` with reconciled inventory, `tasks/repo-seeding.md` with verification evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Acceptance Criteria:**
  - Inventory of all Phase 23 apps with IDs, names, repo slugs, spec paths, and downstream repo status.
  - All repos verified PRIVATE with required artifacts.
  - Risk groups and blocker posture documented.
  - Rate-limit evidence recorded.

  **Ship-one-step handoff:** Implement only Step 23.1, validate it, then run `/ship` when done.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`.

  **Results (2026-06-06):**
  - 73 repos verified serially via `gh api`. Rate limit: 338 of 5000 core calls used.
  - **65 PASS, 8 FAIL** (2 unauthorized workflows, 6 spec ID mismatches).
  - Workflow failures: `todoist-mobile-clone`, `monica-mobile-clone` — each has 6 `.github/workflows/` files. Remediation: delete workflow directories.
  - Spec ID mismatches: `camscanner-mobile-clone` (+43 offset), `genius-scan-mobile-clone` (+43), `scanner-pro-mobile-clone` (+43), `docusign-mobile-clone` (+3), `adobe-scan-mobile-clone` (+3), `microsoft-lens-mobile-clone` (+3). Content correct, filenames have wrong numeric prefix.
  - 7 transient API failures re-verified manually — all PASS.
  - 10 risk groups documented with carry-forward blockers.
  - Neither workflow presence nor spec ID mismatches block variant scaffold work in Steps 23.2-23.7.
  - Full evidence in `tasks/repo-seeding.md` under "Phase 23 Step 23.1".

- [x] Step 23.2: Build static variant scaffolds for all Phase 23 Productivity & Collaboration apps ✅ 2026-06-06
  - Build `variants/static/` scaffold for all Phase 23 downstream repos.
  - Each scaffold: `index.html`, `styles.css`, `app.js`, `README.md` with app-specific screens/features, category-specific UI patterns.
  - Generator script at `/tmp/generate-productivity-prototypes.mjs`.
  - Serial GitHub API verification post-scaffold.
  - Record pre/post rate-limit evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Ship-one-step handoff:** Implement only Step 23.2, validate it, then run `/ship` when done.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`, ~73 downstream repos (`variants/static/`).

  **Implementation Plan (Step 23.2):**

  **What:** Build and push `variants/static/` scaffolds (index.html, styles.css, app.js, README.md) to all 73 Phase 23 Productivity & Collaboration downstream repos.

  **Approach:**
  1. Write `/tmp/generate-productivity-prototypes.mjs` — a Node.js generator script that:
     - Defines all 73 apps with their IDs, names, repo slugs, categories, and category-specific screens/features.
     - Category-specific UI patterns:
       - **Task Management** (Notion, Todoist, Trello, Coda, Airtable): kanban boards, task lists, database views, drag-and-drop, rich text blocks.
       - **Notes & Knowledge** (Obsidian, Bear, iA Writer, Ulysses, Craft, Roam Research, Logseq, Standard Notes, Joplin, Simplenote, Notesnook, Anytype, Evernote, OneNote): markdown editor, notebook/folder sidebar, note list, tagging, search, bidirectional links.
       - **Documents & Office** (Google Docs/Sheets/Slides, MS Word/Excel/PowerPoint, Apple Pages/Numbers/Keynote, MS 365): document editor, toolbar/ribbon, spreadsheet grid, slide canvas, formatting controls.
       - **Calendar** (Google Calendar, Fantastical, BusyCal, Timepage, Calendars by Readdle, Proton Calendar, Doodle): month/week/day views, event creation, drag-to-resize, color-coded calendars.
       - **Scheduling** (Calendly, Cal.com, SavvyCal, Acuity, Square Appointments, Vagaro, Mindbody, Fresha, Booksy, StyleSeat, Schedulicity, Setmore): booking page, availability grid, client list, appointment details, service catalog.
       - **Cloud Storage** (Dropbox, Google Drive, Box, OneDrive, iCloud Drive, MEGA, pCloud, Sync.com, WeTransfer): file browser, folder tree, upload area, sharing dialog, storage quota.
       - **Document Scanning** (CamScanner, Genius Scan, Scanner Pro, Adobe Acrobat Reader, DocuSign, Adobe Scan, Microsoft Lens): camera viewfinder, document crop/enhance, PDF viewer, scan list, signature pad.
       - **Email** (Gmail, Outlook): inbox list, email thread view, compose modal, label/folder sidebar.
       - **Creator Tools** (CapCut, Canva, Lightroom): timeline/canvas, tools panel, media library, export dialog, filter/adjustment controls.
       - **Design** (Figma): canvas, layers panel, properties inspector, component library, toolbar.
       - **AI Assistant** (Monica): chat interface, conversation list, prompt input, settings.
       - **Translation** (Google Translate, DeepL): source/target language selectors, text input/output, history list.
     - For each app: clone repo to `/tmp/`, create `variants/static/` directory, write 4 files, commit, push.
     - Serial execution with rate-limit awareness (30s between repos minimum per CLAUDE.md).
  2. `gh api rate_limit` — record pre-run evidence.
  3. Run generator: `node /tmp/generate-productivity-prototypes.mjs`.
  4. `gh api rate_limit` — record post-run evidence.
  5. Verify all 73 repos have `variants/static/index.html` via `gh api`.
  6. Update `tasks/todo.md` with results, `tasks/repo-seeding.md` with verification evidence.

  **Key Technical Decisions:**
  - Follow the same generator pattern used in Phases 18-22 for static variants.
  - Each `index.html` must include app-specific screen mockups with category-appropriate UI elements.
  - Each `styles.css` uses app-specific color theme derived from the app's brand identity.
  - Each `app.js` implements tab/screen navigation and basic interaction stubs.
  - Each `README.md` documents the static prototype scope, screens, and blockers.
  - Stop on any 403, 429, or rate-limit response per CLAUDE.md.

  **Prior Phase Patterns:**
  - Phase 22 used the same approach with `/tmp/generate-education-prototypes.mjs`.
  - Generator scripts use `execSync` for git/gh commands, serial processing, rate-limit checks.
  - Expect ~73 × 5 API calls for clone/push/verify = ~365 calls within rate limit budget.

  **Acceptance Criteria:**
  - All 73 repos have `variants/static/` with `index.html`, `styles.css`, `app.js`, `README.md`.
  - Each scaffold has category-appropriate screens and UI patterns.
  - Verification: 73/73 repos confirmed via `gh api`.
  - Rate-limit evidence recorded before and after.
  - `tasks/todo.md` checked off, `tasks/repo-seeding.md` updated.

  **Results (2026-06-06):**
  - Generator: `/tmp/generate-productivity-prototypes.mjs` — serial clone → scaffold → commit → push with 30s delays.
  - **73/73 repos scaffolded and pushed successfully. 0 failures.**
  - Run time: 05:55 UTC – 06:36 UTC (~41 minutes).
  - Pre-run rate limit: 0/5000 used. Post-run rate limit: 2/5000 used.
  - Verification: 73/73 repos confirmed via `gh api` (variants/static/index.html present).
  - 20-repo spot check confirmed all 4 files (index.html, styles.css, app.js, README.md) present.
  - 12 category-specific UI patterns: Task Management (5), Notes & Knowledge (14), Documents & Office (10), Calendar (7), Scheduling (12), Cloud Storage (9), Document Scanning (7), Email (2), Creator Tools (3), Design (1), AI Assistant (1), Translation (2).
  - Full evidence in `tasks/repo-seeding.md` under "Phase 23 Step 23.2".

- [ ] Step 23.3: Build React Native variant scaffolds for all Phase 23 Productivity & Collaboration apps
  - Build `variants/react-native/` scaffold for all Phase 23 downstream repos.
  - Each scaffold: `package.json`, `tsconfig.json`, `app.json`, `index.js`, `src/screens/`, `src/components/`, `src/navigation/AppNavigator.js`, `src/services/`, `src/hooks/`, `BLOCKERS.md`.
  - Generator script at `/tmp/generate-productivity-rn-variants.mjs`.
  - Serial GitHub API verification post-scaffold.
  - Record pre/post rate-limit evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Ship-one-step handoff:** Implement only Step 23.3, validate it, then run `/ship` when done.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`, ~73 downstream repos (`variants/react-native/`).

- [ ] Step 23.4: Build Flutter variant scaffolds for all Phase 23 Productivity & Collaboration apps
  - Build `variants/flutter/` scaffold for all Phase 23 downstream repos.
  - Each scaffold: `pubspec.yaml`, `analysis_options.yaml`, `lib/main.dart`, `lib/screens/`, `lib/widgets/`, `lib/services/`, `lib/models/`, `lib/providers/`, `BLOCKERS.md`.
  - Generator script at `/tmp/generate-productivity-flutter-variants.mjs`.
  - Serial GitHub API verification post-scaffold.
  - Record pre/post rate-limit evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Ship-one-step handoff:** Implement only Step 23.4, validate it, then run `/ship` when done.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`, ~73 downstream repos (`variants/flutter/`).

- [ ] Step 23.5: Build Expo variant scaffolds for all Phase 23 Productivity & Collaboration apps
  - Build `variants/expo/` scaffold for all Phase 23 downstream repos.
  - Each scaffold: `package.json`, `tsconfig.json`, `app.json`, `app/_layout.tsx`, `app/(tabs)/`, `src/components/`, `src/services/`, `src/hooks/`, `src/stores/`, `BLOCKERS.md`.
  - Generator script at `/tmp/generate-productivity-expo-variants.mjs`.
  - Serial GitHub API verification post-scaffold.
  - Record pre/post rate-limit evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Ship-one-step handoff:** Implement only Step 23.5, validate it, then run `/ship` when done.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`, ~73 downstream repos (`variants/expo/`).

- [ ] Step 23.6: Build iOS Native (SwiftUI) variant scaffolds for all Phase 23 Productivity & Collaboration apps
  - Build `variants/ios-native/` scaffold for all Phase 23 downstream repos.
  - Each scaffold: `Package.swift`, `Sources/App/<AppName>App.swift`, `Sources/Views/`, `Sources/Components/`, `Sources/Services/`, `Sources/Models/`, `Sources/ViewModels/`, `BLOCKERS.md`.
  - Generator script at `/tmp/generate-productivity-ios-variants.mjs`.
  - Serial GitHub API verification post-scaffold.
  - Record pre/post rate-limit evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Ship-one-step handoff:** Implement only Step 23.6, validate it, then run `/ship` when done.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`, ~73 downstream repos (`variants/ios-native/`).

- [ ] Step 23.7: Build Android Native (Kotlin/Jetpack Compose) variant scaffolds for all Phase 23 Productivity & Collaboration apps
  - Build `variants/android-native/` scaffold for all Phase 23 downstream repos.
  - Each scaffold: `build.gradle.kts`, `settings.gradle.kts`, `gradle.properties`, `src/main/AndroidManifest.xml`, `src/main/java/com/clone/<pkg>/MainActivity.kt`, `App.kt`, `ui/screens/`, `ui/components/`, `data/`, `model/`, `viewmodel/`, `BLOCKERS.md`.
  - Generator script at `/tmp/generate-productivity-android-variants.mjs`.
  - Serial GitHub API verification post-scaffold.
  - Record pre/post rate-limit evidence.

  **Execution profile:** serial, main agent integration owner, low conflict risk.

  **Ship-one-step handoff:** Implement only Step 23.7, validate it, then run `/ship` when done.

  **Files:** `tasks/todo.md`, `tasks/repo-seeding.md`, ~73 downstream repos (`variants/android-native/`).

### Milestone: Phase 23 — Productivity & Collaboration Complete
**Acceptance Criteria:**
- [ ] Exact Phase 23 inventory reconciled.
- [ ] All apps have 5 variants addressed or explicit blockers.
- [ ] Every variant passes validation with evidence recorded.
- [ ] CRUD, sync, and collaboration flows functional or explicitly blocked.
- [ ] Category-specific risk review documented.

### Reference

- Build plan template: `templates/build-plan-template.md`
- Variant structure: `templates/variant-structure.md`
- Benchmark harness: `GeorgeQLe/mobile-benchmark-harness`
- Downstream repo manifest: `tasks/repo-seeding.md`
- Phase 22 archive: `tasks/phases/phase-22.md`

**On Completion** (fill in when phase is done):
- Deviations from plan:
- Tech debt / follow-ups:
- Ready for next phase:
