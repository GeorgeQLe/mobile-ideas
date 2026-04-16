# Spec Quality Audit

Created: 2026-04-16

## Verdict

The 100 technical specs are complete as Draft 0 coverage, but they cannot be verified as "best quality" or "very detailed" yet.

The current set is useful as a structured starting point: every numbered app idea has a spec file, every spec has the major expected sections, and the legal boundary is stated. The gap is depth and verification. Several specs are concise implementation briefs rather than detailed one-for-one clone specs, and none of the specs should be treated as live-researched product truth until their research checklists are completed.

## Audit Scope

- Reviewed `tasks/ideas.md`.
- Reviewed `specs/README.md`.
- Reviewed all 100 numbered specs under `specs/batch-01/` through `specs/batch-05/`.
- Sampled representative strong, medium, and weak specs.
- Ran a structural metrics pass over all numbered spec files.

## Quality Gate Used

A spec should meet these Draft 1 minimums before being called detailed:

- At least 90 lines of app-specific content.
- At least 6 screen inventory rows.
- At least 6 functional requirement bullets.
- At least 3 data model bullets with entity responsibilities.
- At least 4 API/backend contract bullets.
- At least 4 core user journey bullets.
- At least 5 acceptance test bullets.
- At least 4 research verification items.
- At least 3 privacy, permission, or safety bullets.
- At least 2 analytics bullets or an event taxonomy grouped by flow.

These thresholds are intentionally mechanical. Passing them does not prove quality by itself, but failing them is a reliable signal that the spec is not yet detailed enough for implementation planning.

## Metrics Summary

- Numbered app specs present: 100.
- Missing numeric IDs from `001` through `100`: 0.
- Specs with all major required sections: 100.
- Specs failing at least one Draft 1 depth threshold: 60.
- Specs below 90 lines: 60.
- Specs with fewer than 6 screen rows: 40.
- Specs with fewer than 6 functional requirements: 60.
- Specs with fewer than 3 data model bullets: 19.
- Specs with fewer than 4 API/backend bullets: 2.
- Specs with fewer than 5 acceptance tests: 40.
- Specs with fewer than 4 research verification items: 19.
- Specs with fewer than 2 analytics bullets or grouped event lines: 60.

## Findings

### High: The Specs Are Draft 0, Not Verified One-For-One Research Specs

`specs/README.md` explicitly states that the directory contains "Draft 0 technical specs" and that the research status is "not completed live product research." The verification gate also says live research must happen before implementation.

Impact: The specs cannot be certified as one-for-one clone requirements yet. They are informed drafts with open verification tasks.

Recommended fix: Run a live research pass per app using app listings, first-party help docs, public screenshots, privacy labels, hands-on product observation where lawful, and user review themes. Replace inferred requirements with verified behavior before implementation.

### High: Detail Depth Is Uneven Across Batches

Batch 1 and Batch 4 are generally stronger, with many specs around 90-100 lines. Batch 2, Batch 3, and Batch 5 are materially thinner. For example, `specs/batch-05/085-nike-run-club.md` has only 72 lines, 5 functional requirements, 2 data model bullets, 3 API/backend bullets, and 4 acceptance tests. `specs/batch-02/033-airbnb.md` has 79 lines and only 4 functional requirement bullets for a two-sided marketplace with search, booking, messaging, host tools, payments, cancellations, and reviews.

Impact: Thin specs will push product and architecture decisions into implementation, which increases rework and makes it harder to estimate or parallelize builds.

Recommended fix: Expand every spec that fails the Draft 1 threshold. Add app-specific feature matrices, state machines, data entity responsibilities, API payload expectations, permission prompts, abuse/fraud cases, error states, and test coverage.

### High: Many Specs Are Not Detailed Enough For Regulated Or High-Risk Domains

Finance, health, wellness, mobility, smart home, marketplace, and communication apps need stronger privacy, safety, compliance, fraud, identity, moderation, and data-retention requirements than a generic clone spec. Some high-risk specs do this well, such as the Coinbase-style spec, but the level is not consistent across all similar apps.

Impact: Implementation could miss app-store policy, privacy, safety, financial, medical-adjacent, or marketplace trust requirements.

Recommended fix: Add category-specific risk sections to affected specs: finance/legal review, health disclaimer and data minimization, child safety where relevant, location privacy, fraud controls, marketplace dispute workflows, and smart-home security.

### Medium: Research Checklist Format Is Inconsistent

Some specs use checkbox-style verification lists, while others use plain "verify" bullets. Some include an explicit "pending lawful research" status and others do not.

Impact: It will be harder to track which specs are researched, partially researched, or ready for build.

Recommended fix: Normalize every spec to a checkbox checklist with an explicit research status field: `Not started`, `In progress`, `Verified`, or `Blocked`.

### Medium: Analytics And Monetization Are Often Too Thin

Many specs have one analytics line containing all events and one short monetization bullet. That is enough for a Draft 0 placeholder, but not enough for implementation or experiment planning.

Impact: Teams building instrumentation or paywall surfaces will lack event schemas, funnel boundaries, subscription states, refund paths, ad surfaces, and entitlement rules.

Recommended fix: Expand analytics into event groups with required properties and add monetization state diagrams or entitlement matrices where relevant.

### Medium: Acceptance Tests Are Too Shallow For Implementation Readiness

All specs include acceptance tests, but many stop at 3-4 happy-path checks. Very few include negative tests, accessibility checks, offline recovery, permission denial, abuse flows, or data deletion cases.

Impact: A developer could build the happy path and still miss critical production behavior.

Recommended fix: Require at least 10 acceptance tests per spec: happy path, empty state, permission denied, offline/poor network, account deletion/export, abuse/safety, billing, accessibility, notification, and regression cases.

## Positive Observations

- The repo has complete numerical coverage from `001` through `100`.
- Every numbered spec includes the major structural sections.
- The specs consistently avoid instructing developers to copy branding, proprietary APIs, private code, or copyrighted assets.
- Several specs are strong Draft 0 examples, especially `specs/batch-01/001-chatgpt.md` and `specs/batch-04/061-coinbase.md`.
- The top-level `specs/README.md` correctly states the live-research gate instead of overstating confidence.

## Recommended Next Pass

Run a "Draft 1 deepening" pass over all 100 specs with priority on the 60 failing specs. A good target for each spec:

- 120-180 lines.
- 8-12 screen rows.
- 12-20 functional requirements.
- 8-15 explicit data entities with responsibilities.
- API contracts with request/response payload notes and write idempotency rules.
- Realtime/offline/push behavior with failure states.
- Category-specific privacy, safety, fraud, and compliance requirements.
- Analytics grouped by onboarding, core action, retention, monetization, and safety.
- 10+ acceptance tests.
- Completed or clearly blocked research checklist items.

## Bottom Line

The current specs are a good scaffold and useful Draft 0. They are not yet best-quality, deeply researched, one-for-one clone specs.
