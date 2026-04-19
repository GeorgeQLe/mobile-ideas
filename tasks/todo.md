# Todo

## Priority Task Queue

- [x] Upgrade `006-tiktok.md` to implementation-ready status using the `001-chatgpt.md` pattern.
- [x] Upgrade `016-whatsapp.md` to implementation-ready status.
- [x] Upgrade `026-google-maps.md` to implementation-ready status.
- [x] Upgrade `033-airbnb.md` to implementation-ready status.
- [x] Upgrade `038-doordash.md` to implementation-ready status.
- [x] Upgrade `046-amazon.md` to implementation-ready status.
- [x] Upgrade `056-cash-app.md` to implementation-ready status.
- [x] Upgrade `066-spotify.md` to implementation-ready status.
- [x] Upgrade the remaining top-ten architecture-teaching spec: `089-notion.md`.
- [x] Upgrade remaining Batch 01 AI/social Draft 1 specs: `002-005` and `007-015`.
- [x] Upgrade Batch 02 communication/email specs: `021-025`.
- [x] Upgrade Batch 02 maps/mobility specs: `027-032`.
- [x] Upgrade Batch 02 travel booking specs: `034-037`.
- [x] Upgrade Batch 02 food/grocery delivery specs: `039-040`.
- [x] Upgrade Batch 04 finance/wallet specs: `061-065`.
- [ ] Upgrade the remaining 28 specs by batch after the Batch 01, Batch 02, Batch 03, Batch 04 finance/wallet, and Batch 04 audio patterns are proven.

## Phase 2: Hygiene And Draft 1 Remediation

- [x] Add `CLAUDE.md` with project conventions.
- [x] Add `tasks/roadmap.md` with phase structure.
- [x] Add `tasks/history.md` with dated project history.
- [x] Add `## Next Steps` to generated task artifacts.
- [x] Rewrite all numbered specs into canonical Draft 1 structure.
- [x] Run final hygiene and quality validation.
- [x] Commit and push remediation work.

## Phase 3: Exact Source Replacement And Hands-On Verification

- [x] Define the implementation-readiness gate in `tasks/implementation-readiness.md`.
- [x] Upgrade `001-chatgpt.md` from Draft 1 scaffold to implementation-ready public-source V1 spec.
- [x] Upgrade `017-telegram.md`, `018-signal.md`, `019-discord.md`, and `020-slack.md` to implementation-ready public-source V1 status.
- [ ] Replace App Store, Google Play, and official help/privacy source-discovery links in the remaining 28 specs with exact first-party URLs.
- [ ] Complete hands-on verification for reachable app flows using lawful test accounts/devices, or mark the flow as launch-blocked.
- [ ] Mark paid, hardware, region-blocked, regulated, or otherwise inaccessible flows with explicit blocker notes and owner/path.
- [ ] Refresh `tasks/spec-quality-audit.md` after exact source replacement and hands-on verification.

## Next Runnable Step: Upgrade Batch 04 video and entertainment specs

### Scope

- Upgrade the next Batch 04 Draft 1 video/live-streaming/entertainment specs: `specs/batch-04/072-netflix.md`, `specs/batch-04/073-youtube.md`, `specs/batch-04/074-twitch.md`, `specs/batch-04/075-letterboxd.md`, and `specs/batch-04/076-imdb.md`.
- Archive each current Draft 1 file under `docs/history/archive/2026-04-19/phase-3-batch-04-video-entertainment-readiness/` before rewriting.
- Rewrite each selected spec to implementation-ready public-source V1 status using the evidence depth now present in the completed audio, marketplace, commerce, travel, mobility, communication, social, and finance patterns.
- Update `tasks/implementation-readiness.md`, `tasks/spec-quality-audit.md`, `specs/README.md`, `specs/batch-04/README.md`, `tasks/todo.md`, `tasks/history.md`, and any summary file whose readiness count becomes stale.

### Source Research

- Replace App Store, Google Play, and official help/privacy source-discovery links with exact first-party URLs for Netflix, YouTube, Twitch, Letterboxd, and IMDb.
- Prioritize public sources for account model, subscription tiers, ads, video catalog or user-generated video rights, live streaming/chat, creator/channel tools, profiles/watchlists/lists/reviews/ratings, parental controls, downloads/offline, playback quality, recommendations, captions/subtitles/transcripts, moderation, reporting, data export/deletion, support, regional availability, accessibility, and legal/licensing disclosures.
- Keep account onboarding, paid subscription, ad delivery, licensed video catalog, downloads/offline, live streaming, creator monetization, chat moderation, ratings/reviews, watch history, push payloads, data deletion/export, support, and device-specific behavior as manual blockers unless verified lawfully with test accounts/devices and any required provider approvals.

### Implementation Notes

- Produce app-specific screen inventory, data model, API/backend contracts, offline/realtime behavior, analytics, safety/privacy controls, edge cases, acceptance criteria, and build plan for each upgraded spec.
- Treat licensed video rights, creator/user-generated content, copyright/DMCA, subscriptions, ads, parental/minor controls, live chat, review integrity, recommendations, playback telemetry, downloads/offline, accessibility, data deletion, support, and regional availability as category risk areas where relevant.
- Do not claim exact native parity for any account, notification, deletion/export, support, subscription, catalog, playback, download, live stream, chat, creator, review/rating, recommendation, or platform-specific flow until verified.

### Validation

- Confirm the upgraded specs each have exactly one H1 and all canonical sections.
- Confirm source-discovery links are gone from each upgraded Batch 04 video/entertainment spec.
- Confirm readiness counts and next-step references advance from 72 completed specs to the new batch total.
