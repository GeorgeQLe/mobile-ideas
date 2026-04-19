# Record Todo

## Documentation Records

- [ ] Capture first customer-feedback synthesis
  - Source: `$customer-feedback`
  - Condition: User interviews, beta feedback, support tickets, survey results, or other customer/user feedback is available for the Todoist downstream app or the broader mobile clone planning project.
  - Non-blocking reason: No customer feedback corpus exists in this planning repository yet, so this should not block the current research queue.
  - Required data/access: Feedback excerpts, interview notes, survey exports, support logs, or user-provided findings with permission to summarize them.
  - Measurement/query: Run `$customer-feedback` and classify each finding against the ICP and journey map once those documents exist.
  - Target/acceptance note: `research/customer-feedback.md` exists with a top-level synthesis, source/session notes, and explicit confirmed, wrong, or needs-more-evidence findings.
  - Revisit: Promote when the first meaningful feedback batch is available.
  - Completion evidence: `research/customer-feedback.md` plus a `tasks/history.md` entry if the feedback changes project direction.
  - Promotion rule: Move into `tasks/todo.md` when feedback data exists and normal repo context is enough to synthesize it.

- [ ] Capture Todoist native/manual parity verification evidence
  - Source: `tasks/spec-quality-audit.md`, `specs/batch-05/090-todoist.md`, and `tasks/todoist-downstream-build-plan.md`
  - Condition: Lawful test accounts, devices, paid-plan access where appropriate, and permission to record observations are available.
  - Non-blocking reason: The current public-source V1 spec and downstream build plan are intentionally allowed to proceed with provider stubs, feature flags, and blocked acceptance tests.
  - Required data/access: Lawful Todoist account/device access, notification/calendar/widget/watch/billing/export/delete/support observations, and any allowed screenshots or notes.
  - Measurement/query: Verify the deferred blocker list: signup/login, quick-add parsing, recurring dates, push reminder payloads, calendar integrations, team/admin flows, billing, widgets, Wear OS/watch behavior, offline conflicts, productivity trends, export/delete, and support escalation.
  - Target/acceptance note: Evidence either removes a blocker with a dated note or preserves the blocker with a concrete reason and owner/path.
  - Revisit: Before any downstream native parity claim or release milestone.
  - Completion evidence: Updated `specs/batch-05/090-todoist.md`, `tasks/todoist-downstream-build-plan.md`, or downstream repository evidence links.
  - Promotion rule: Move into `tasks/todo.md` when a verification session is scheduled and the required access is available.

- [ ] Produce MVP gap analysis for the downstream implementation
  - Source: `$mvp-gap`
  - Condition: The downstream repository has enough implementation code to compare against `research/icp.md`, `research/journey-map.md`, and the Todoist source spec.
  - Non-blocking reason: This planning repository does not contain runtime app code, and the downstream implementation has not been inspected as part of this research-roadmap refresh.
  - Required data/access: Read access to `https://github.com/GeorgeQLe/todoist-mobile-clone`, source spec links, current implementation status, and current research docs.
  - Measurement/query: Run `$mvp-gap` against the downstream app and compare implementation coverage to the ICP, journey, and planned routes/entities/contracts.
  - Target/acceptance note: `specs/mvp-gap.md` or a downstream-equivalent gap report exists with priority, evidence, effort, journey stage, and closure metrics.
  - Revisit: After the downstream app has a meaningful first vertical slice.
  - Completion evidence: `specs/mvp-gap.md`, downstream linked report, or updated roadmap item.
  - Promotion rule: Move into `tasks/todo.md` when downstream code exists and can be evaluated.

- [ ] Produce enterprise scale audit
  - Source: `$scale-audit`
  - Condition: `research/enterprise-icp.md` exists and there is enough downstream implementation or architecture to evaluate production readiness, compliance, and multi-stakeholder coverage.
  - Non-blocking reason: Enterprise scale readiness is premature until enterprise ICP research and a concrete implementation surface exist.
  - Required data/access: Enterprise ICP, downstream architecture and code, auth/admin/security/compliance surfaces, and deployment assumptions.
  - Measurement/query: Run `$scale-audit` and compare stakeholder coverage, compliance needs, policy controls, and production readiness gaps.
  - Target/acceptance note: `specs/scale-audit.md` or downstream-equivalent report exists with stakeholder and compliance matrices plus prioritized gaps.
  - Revisit: Before enterprise-targeted sales, pilots, or production-readiness claims.
  - Completion evidence: `specs/scale-audit.md`, downstream linked report, or updated enterprise roadmap item.
  - Promotion rule: Move into `tasks/todo.md` when enterprise ICP and implementation evidence are both present.
