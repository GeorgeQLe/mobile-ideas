# Spec Quality Audit

Created: 2026-04-16
Updated: 2026-04-17

## Verdict

The 100 technical specs pass the Draft 1 structural and depth gate. Phase 3 implementation-readiness upgrades have now replaced discovery sources with exact first-party URLs for 42 specs.

Most specs are still not final one-for-one clone specs because exact first-party source URLs and hands-on verification remain open Phase 3 work. The implementation-ready public-source V1 set is: `001-chatgpt.md` through `038-doordash.md`, `046-amazon.md`, `056-cash-app.md`, `066-spotify.md`, and `089-notion.md`.

## Audit Scope

- Reviewed `tasks/ideas.md`.
- Reviewed `specs/README.md`.
- Reviewed all 100 numbered specs under `specs/batch-01/` through `specs/batch-05/`.
- Checked lifecycle docs required by hygiene.
- Ran a structural metrics pass over all numbered spec files.

## Quality Gate Used

A Draft 1 or public-source V1 spec must meet these minimums:

- One H1 and all canonical sections.
- App-specific research source table or source-discovery list, depending on readiness state.
- App-specific source-backed requirements, screen inventory, data model, API/backend contracts, offline/realtime behavior, privacy/safety controls, analytics, edge cases, tests, acceptance criteria, open questions, and next steps.
- Explicit blocked hands-on verification notes for account, paid, native, notification, device, and regional behavior that has not been lawfully verified.

## Metrics Summary

- Numbered app specs present: 100.
- Missing numeric IDs from `001` through `100`: 0.
- Specs with exactly one H1: 100.
- Specs with all canonical sections: 100.
- Specs passing Draft 1 depth metrics: 100.
- Specs failing Draft 1 depth metrics: 0.
- Specs with exact first-party source URLs replacing discovery links: 42.
- Specs with hands-on app behavior fully verified: 0.
- Specs upgraded to implementation-ready public-source V1: 42.

## Resolved Findings

### Resolved: Draft 0 Structure

All numbered specs have been rewritten from Draft 0 custom sections into canonical Draft 1 sections.

### Resolved: Uneven Depth Across Batches

All numbered specs now use the same canonical structure and pass the same depth gate.

### Resolved: Missing Hygiene Lifecycle Docs

`CLAUDE.md`, `tasks/roadmap.md`, and `tasks/history.md` now exist. Generated task artifacts include `## Next Steps`.

### Resolved: Batch 01 AI And Social Source Replacement

`002-claude.md`, `003-perplexity.md`, `004-character-ai.md`, `005-replika.md`, and `007-instagram.md` through `020-slack.md` now use exact first-party marketplace/help/privacy/legal sources instead of discovery links.

### Resolved: Batch 01 Messaging And Workplace Tail Source Replacement

`017-telegram.md`, `018-signal.md`, `019-discord.md`, and `020-slack.md` now use exact first-party marketplace/help/privacy/legal/product sources instead of discovery links and include app-specific messaging, community, safety, billing, admin, and manual-verification blockers.

### Resolved: Batch 02 Communication And Email Source Replacement

`021-messenger.md`, `022-facetime.md`, `023-zoom.md`, `024-gmail.md`, and `025-outlook.md` now use exact first-party marketplace/help/privacy/legal/product sources instead of discovery links and include app-specific messaging, calling, meetings, email, calendar, safety, AI, enterprise/admin, and manual-verification blockers.

### Resolved: Batch 02 Maps And Mobility Source Replacement

`027-apple-maps.md`, `028-waze.md`, `029-uber.md`, `030-lyft.md`, `031-lime.md`, and `032-turo.md` now use exact first-party marketplace/help/privacy/legal/product sources instead of discovery links and include app-specific maps, navigation, rideshare, micromobility, car-sharing, safety, marketplace, insurance/protection, fleet, and manual-verification blockers.

### Resolved: Batch 02 Travel Booking Source Replacement

`034-booking-com.md`, `035-expedia.md`, `036-hopper.md`, and `037-tripit.md` now use exact first-party marketplace/help/privacy/legal/product URLs instead of discovery links and include app-specific lodging, multi-product travel booking, price prediction, trip flexibility, itinerary import, calendar sync, alerts, privacy, support, and manual-verification blockers.

## Remaining Findings

### High: Exact Source Replacement Remains Open

Fifty-eight specs still include App Store, Google Play, and official help/privacy source-discovery links. These are not exact verified first-party listing/help/privacy URLs.

Impact: A builder still needs to complete the app-by-app research pass before claiming one-for-one product truth.

Recommended fix: In Phase 3, replace every source-discovery link with exact marketplace listing, first-party help/support page, privacy policy, and any public product documentation used.

### High: Hands-On Verification Remains Blocked

All specs still have hands-on account/device verification incomplete. Implementation-ready specs list manual native/parity blockers explicitly rather than treating them as generic unresolved research.

Impact: Subscription-gated flows, physical-device flows, region-specific flows, account recovery, deletion/export, and notification behavior may still differ from production apps.

Recommended fix: Use lawful test accounts/devices to verify reachable flows. Mark paid, regulated, hardware, or region-blocked flows explicitly.

## Positive Observations

- The repo has complete numerical coverage from `001` through `100`.
- Every numbered spec includes canonical hygiene sections.
- Every numbered spec includes legal guardrails, research-source orientation, privacy/safety requirements, edge cases, test plan, acceptance criteria, open questions, and next steps.
- The spec set now distinguishes source discovery from exact verification and hands-on behavior.
- Batch 01 now has implementation-ready public-source V1 coverage for AI assistant, AI search, AI companion, short-video, social-media, camera-social, community, decentralized-social, visual-discovery, lifestyle-social, private messaging, cloud messaging, privacy messaging, community chat, and workplace chat patterns.
- Batch 02 now has implementation-ready public-source V1 coverage for communication, calling, meetings, email, maps, navigation, rideshare, micromobility, car-sharing, lodging marketplace, multi-product travel booking, travel deals, itinerary organization, and local delivery patterns.

## Next Steps

- Upgrade `039-uber-eats.md` and `040-instacart.md` to implementation-ready public-source V1 status.
- Continue Phase 3 implementation-readiness upgrades for the remaining 58 Draft 1 specs by batch.
- Complete hands-on verification where lawful and feasible.
