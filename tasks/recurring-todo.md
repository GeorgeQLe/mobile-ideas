# Recurring Todo

## Documentation Recurring Work

- [ ] Refresh research roadmap
  - Cadence: Monthly or after any major research/spec/roadmap change
  - Owner/agent: `$research-roadmap`
  - Scope: Planning repository documentation queue
  - Trigger: New research docs, changed specs, downstream implementation milestones, or user request
  - Last run: 2026-04-19
  - Next due: 2026-05-19 or after the next major documentation change
  - Command/skill: `$research-roadmap`
  - Evidence/output path: `tasks/todo.md`, `tasks/record-todo.md`, and `tasks/recurring-todo.md`
  - Escalation conditions: Promote findings into `tasks/todo.md` when missing or stale documentation becomes immediately actionable.

- [ ] Review launch cohorts and funnel performance
  - Cadence: Monthly after launch data exists
  - Owner/agent: `$cohort-review`
  - Scope: Todoist downstream app and any later selected implementation app
  - Trigger: Production, beta, or analytics aggregate data is available against `research/metrics.md`
  - Last run: never
  - Next due: After first launch or beta cohort reaches measurable usage
  - Command/skill: `$cohort-review`
  - Evidence/output path: `research/cohort-review-YYYY-MM-DD.md`
  - Escalation conditions: Promote into `tasks/todo.md` when launch data is available or when a metric misses its target materially.

- [ ] Run strategic decision retro
  - Cadence: Quarterly or after a major product/market decision has outcome data
  - Owner/agent: `$retro`
  - Scope: Research decisions, downstream implementation choices, and launch outcomes
  - Trigger: At least two research docs exist and outcome data exists from feedback, cohort review, or runway model
  - Last run: never
  - Next due: First quarter with outcome data
  - Command/skill: `$retro`
  - Evidence/output path: `research/retro-YYYY-MM-DD.md`
  - Escalation conditions: Promote into `tasks/todo.md` when outcome data contradicts earlier research assumptions.

- [ ] Prepare stakeholder update
  - Cadence: Monthly when stakeholder reporting is active
  - Owner/agent: `$investor-update`
  - Scope: Research state, metrics, runway, roadmap, risks, and asks
  - Trigger: Stakeholder update cadence starts or user requests a monthly update
  - Last run: never
  - Next due: First active stakeholder reporting month
  - Command/skill: `$investor-update`
  - Evidence/output path: `research/investor-update-YYYY-MM.md`
  - Escalation conditions: Promote into `tasks/todo.md` when investor or stakeholder reporting becomes an active obligation.
