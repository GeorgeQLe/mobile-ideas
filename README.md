# Mobile Ideas Spec Store

This repository is the canonical specification store for 100 mobile app clone ideas. It contains product research, lawful functional-parity specs, implementation-readiness notes, and downstream repository seeding plans. It does not contain runtime app code.

## Repository Purpose

The goal is to preserve one source of record for each mobile app concept before implementation starts elsewhere. Each spec defines original implementation targets: workflows, data models, screens, API contracts, privacy requirements, safety controls, edge cases, tests, acceptance criteria, open questions, and manual verification blockers.

"Clone" means lawful functional-parity research. Downstream apps must use original code, original UI composition, original assets, synthetic or properly licensed data, and lawful integrations. This repository must not be used to copy proprietary source code, private APIs, trademarks as branding, logos, screenshots, app-store media, copyrighted content, paywalled content, production credentials, real user data, or inaccessible platform internals.

## Repository Map

- `specs/` - canonical public-source V1 specs for all 100 app ideas.
- `specs/batch-01/` - AI, social, messaging, and workplace chat specs, IDs `001` through `020`.
- `specs/batch-02/` - calling, email, maps, mobility, travel, and delivery specs, IDs `021` through `040`.
- `specs/batch-03/` - food, local discovery, commerce, resale, and finance specs, IDs `041` through `060`.
- `specs/batch-04/` - crypto, budgeting, wallet, audio/video, and education specs, IDs `061` through `080`.
- `specs/batch-05/` - wellness, fitness, productivity, cloud, creator tools, photos, and smart-home specs, IDs `081` through `100`.
- `tasks/repo-seeding.md` - downstream repository manifest, private seeding workflow, evidence log, blockers, and public-release checklist.
- `tasks/roadmap.md` and `tasks/todo.md` - phased project plan and current executable phase.
- `templates/downstream/` - private downstream repository seed templates.
- `scripts/seed-downstream-repos.mjs` - single-target private seeding utility.

## Source And Downstream Policy

This repository remains the canonical spec store. Downstream implementation repositories may copy their selected source spec into `docs/source-specs/` for local planning convenience, but corrections to product requirements should be reflected back here.

All downstream repositories are private by default. A downstream repo should become public only after it has original code/assets, has passed legal, name, license, attribution, non-affiliation, and content review, and has explicit approval for publication.

This spec store itself must remain private until the open-source checklist in `tasks/repo-seeding.md` is complete and publication is explicitly approved.

## Non-Affiliation

The app names in this repository identify source products used for research orientation only. This repository and any downstream implementation are not official, endorsed, sponsored, certified, or connected to the source app owners or any third-party platform named in the specs.

Do not present any downstream project as an official client, partner product, certified integration, or affiliated service unless a separate written authorization exists and is recorded in the relevant repository.

## Legal And Asset Scope

Allowed work:

- Original implementation planning based on public-source research.
- Original code in downstream repositories.
- Original UI composition that avoids copying protected trade dress.
- Synthetic data, generated data, or properly licensed fixtures.
- Public APIs and integrations used under their published terms.
- Manual verification notes recorded without private data or copied media.

Not allowed:

- Proprietary source code, private APIs, reverse-engineered internals, production credentials, or real user data.
- Third-party trademarks as project branding, logos, screenshots, app-store media, copyrighted media, paywalled content, or copied marketing copy.
- Claims of affiliation, sponsorship, endorsement, certification, or official status.
- Removing manual blockers until lawful hands-on evidence exists.

## Source Corrections

Specs may include public-source V1 assumptions and explicit manual blockers. If implementation work finds an error, stale first-party URL, missing blocker, unsafe affiliation wording, or overbroad parity claim, update the relevant spec and record the correction path in the task history.

Use `CONTRIBUTING.md` for contribution rules and `SECURITY.md` for sensitive reports.
