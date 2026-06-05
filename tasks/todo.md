# Phase 22: Implementation — Education & Learning (~31 Apps × 5 Variants)

> Test strategy: none
> Source roadmap: `tasks/roadmap.md`

**Goal**: Build all five variants for every app in the Education & Learning cluster.

**Scope**:
- Apps (~31): Language Learning (Duolingo, Babbel, Rosetta Stone, Busuu, ELSA Speak), Translation (Google Translate, DeepL), LMS/Classroom (Canvas Student, Google Classroom, ClassDojo, Remind), Kids Education (Khan Academy Kids, ABCmouse, ScratchJr, Epic!, YouTube Kids, PBS Kids, Khan Academy), Higher Education (Coursera, Quizlet), Math/STEM (Photomath), Writing/Transcription (Grammarly, Otter.ai, Grammarly Keyboard, Wordtune, QuillBot).
- Shared patterns: lesson/course structure, progress tracking, quizzes/assessments, gamification, spaced repetition, video lessons, certificates, speech recognition, translation engines, content moderation for minors.

**Acceptance Criteria:**
- [ ] Exact Phase 22 inventory reconciled with app IDs, app names, repo slugs, source specs, and downstream readiness.
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

- [ ] Step 22.1: Reconcile exact Education & Learning app inventory and downstream readiness (~26 apps)
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
