# Spec Quality Audit

Created: 2026-04-16
Updated: 2026-04-17

## Verdict

The 100 technical specs now pass the Draft 1 structural and depth gate.

Most specs are still not final one-for-one clone specs because exact first-party source URLs and hands-on verification remain open Phase 3 work. `001-chatgpt.md`, `006-tiktok.md`, `016-whatsapp.md`, `026-google-maps.md`, `033-airbnb.md`, `038-doordash.md`, `046-amazon.md`, and `056-cash-app.md` have been upgraded to implementation-ready public-source V1 specs, with native/manual parity blockers still explicit.

## Audit Scope

- Reviewed `tasks/ideas.md`.
- Reviewed `specs/README.md`.
- Reviewed all 100 numbered specs under `specs/batch-01/` through `specs/batch-05/`.
- Checked lifecycle docs required by hygiene.
- Ran a structural metrics pass over all numbered spec files.

## Quality Gate Used

A Draft 1 spec must meet these minimums:

- 120-180 lines of app-specific content.
- At least 8 screen inventory rows.
- At least 12 detailed-design requirement bullets.
- At least 8 data model bullets with entity responsibilities.
- At least 8 API/backend contract bullets.
- At least 6 core user journey bullets.
- At least 10 test-plan bullets.
- At least 6 research source/status bullets.
- At least 8 privacy, permission, or safety bullets.
- At least 6 analytics or monetization bullets.
- At least 3 next-step bullets.

## Metrics Summary

- Numbered app specs present: 100.
- Missing numeric IDs from `001` through `100`: 0.
- Specs with exactly one H1: 100.
- Specs with all canonical sections: 100.
- Specs passing Draft 1 depth metrics: 100.
- Specs failing Draft 1 depth metrics: 0.
- Specs with exact first-party source URLs replacing discovery links: 8.
- Specs with hands-on app behavior fully verified: 0.
- Specs upgraded to implementation-ready public-source V1: 8.

## Resolved Findings

### Resolved: Draft 0 Structure

All numbered specs have been rewritten from Draft 0 custom sections into canonical Draft 1 sections.

### Resolved: Uneven Depth Across Batches

All numbered specs now use the same generator-backed structure and pass the same depth gate.

### Resolved: Missing Hygiene Lifecycle Docs

`CLAUDE.md`, `tasks/roadmap.md`, and `tasks/history.md` now exist. Generated task artifacts include `## Next Steps`.

## Remaining Findings

### High: Exact Source Replacement Remains Open

Ninety-two specs still include App Store, Google Play, and official help/privacy source-discovery links. These are not exact verified first-party listing/help/privacy URLs.

Impact: A builder still needs to complete the app-by-app research pass before claiming one-for-one product truth.

Recommended fix: In Phase 3, replace every source-discovery link with exact marketplace listing, first-party help/support page, privacy policy, and any public product documentation used.

### High: Hands-On Verification Remains Blocked

All specs still have hands-on account/device verification incomplete. `001-chatgpt.md`, `006-tiktok.md`, `016-whatsapp.md`, `026-google-maps.md`, `033-airbnb.md`, `038-doordash.md`, `046-amazon.md`, and `056-cash-app.md` now list manual native/parity blockers explicitly rather than treating them as generic unresolved research.

Impact: Subscription-gated flows, physical-device flows, region-specific flows, account recovery, deletion/export, and notification behavior may still differ from production apps.

Recommended fix: Use lawful test accounts/devices to verify reachable flows. Mark paid, regulated, hardware, or region-blocked flows explicitly.

## Positive Observations

- The repo has complete numerical coverage from `001` through `100`.
- Every numbered spec includes canonical hygiene sections.
- Every numbered spec includes legal guardrails, research-source orientation, privacy/safety requirements, edge cases, test plan, acceptance criteria, open questions, and next steps.
- The spec set now distinguishes source discovery from exact verification and hands-on behavior.
- The TikTok spec now includes public-source requirements for feeds, creator tools, sounds/effects, remixing, recommendation controls, teen/family controls, safety policy, and commerce blockers.
- The WhatsApp spec now includes public-source requirements for phone-number onboarding, chats, groups, calls, status, channels, backups, linked devices, privacy/security controls, reporting/blocking, business/payment blockers, and AI blockers.
- The Google Maps spec now includes public-source requirements for map search, place details, directions, navigation, transit, traffic/incidents, offline maps, saved places, reviews/photos, business profiles, Street View/Immersive/Lens-style features, location sharing, Timeline/activity controls, ads, and location-safety blockers.
- The Airbnb spec now includes public-source requirements for lodging search, map/list results, listing detail, booking checkout, fees/taxes, cancellations/refunds, Trips, messaging, reviews, wishlists, identity verification, host tools, payouts, damage/disputes, safety/privacy policies, and lodging-marketplace blockers.
- The DoorDash spec now includes public-source requirements for restaurant/store discovery, menu modifiers, cart quotes, checkout fees/taxes/tips, DashPass, SNAP/EBT, alcohol ID verification, realtime order tracking, Dasher handoff, pickup, merchant adjustments, support/refunds, privacy controls, and local-delivery marketplace blockers.
- The Amazon spec now includes public-source requirements for broad shopping marketplace discovery, product detail and variation selection, seller offers, cart/checkout, Prime-style benefits, Subscribe & Save-style recurring orders, order tracking, returns/refunds/replacements, seller tools, sponsored listings, review authenticity, customer support, privacy controls, and commerce-marketplace blockers.
- The Cash App spec now includes public-source requirements for peer payments, requests, payment links, pools, balance, cash out, debit card, direct deposit, savings/offers, merchant checkout, bitcoin, investing, taxes, sponsored accounts, business accounts, security/scam controls, support, privacy controls, and regulated-finance blockers.

## Next Steps

- Continue Phase 3 implementation-readiness upgrades, starting with `066-spotify.md`.
- Complete hands-on verification where lawful and feasible.
- Refresh this audit after Phase 3 to report verified source coverage and remaining blockers.
