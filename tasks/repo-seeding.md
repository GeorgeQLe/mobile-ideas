# Downstream Repository Seeding Todo

## Purpose

Seed one downstream GitHub repository for each implementation-ready public-source V1 clone spec, while keeping this repository as the canonical spec store.

This file is an operational checklist. Do not create public clone implementation repos until the relevant name, license, attribution, and non-affiliation language has been reviewed.

## Source Of Truth

- Canonical spec store: `GeorgeQLe/mobile-ideas`
- Source specs: `specs/batch-*/NNN-*.md`
- High-level implementation queue: `tasks/roadmap.md` Phase 5
- Existing seeded downstream repo: `GeorgeQLe/todoist-mobile-clone`

## Repo Naming

Default target pattern:

```sh
GeorgeQLe/<spec-slug>-mobile-clone
```

The `<spec-slug>` is the numbered spec filename without the numeric prefix. Example: `specs/batch-05/090-todoist.md` maps to `GeorgeQLe/todoist-mobile-clone`.

Before making any downstream repo public, review whether the repo name should use a neutral functional name rather than an inspiration-app name.

## Seed Structure

Each downstream repo should start with:

- `README.md` with original project name, non-affiliation notice, source-spec link, and legal scope.
- `docs/source-specs/NNN-<slug>.md` copied from this spec store.
- `docs/plans/README.md` with an empty app-specific phase plan scaffold.
- `tasks/roadmap.md` with app-specific phases generated from the source spec build plan.
- `tasks/todo.md` with the first executable implementation phase once selected.
- `.gitignore` appropriate for the implementation stack once chosen.

Do not copy proprietary assets, screenshots, logos, app-store media, brand copy, private API details, or production data into any downstream repo.

## GH Command Pattern

Create repos private first:

```sh
gh repo create GeorgeQLe/<spec-slug>-mobile-clone --private --description "<App> inspired lawful mobile clone implementation" --clone=false
```

After creation, seed docs and push:

```sh
gh repo clone GeorgeQLe/<spec-slug>-mobile-clone ../<spec-slug>-mobile-clone
```

Then copy the source spec into `docs/source-specs/`, add README/planning scaffolds, commit, and push.

## Open-Source Spec Store Checklist

- [ ] Add or confirm a license appropriate for documentation/spec content.
- [ ] Refresh `README.md` for public readers, including scope, repo map, and how to use the specs.
- [ ] Add explicit non-affiliation and no-proprietary-assets language.
- [ ] Add contribution guidance for source corrections, manual verification evidence, and downstream implementation links.
- [ ] Audit for secrets, private accounts, copied assets, screenshots, proprietary copy, private APIs, and ambiguous affiliation language.
- [ ] Decide whether downstream clone repos remain private until they contain original code and pass their own legal review.
- [ ] Use `gh repo edit GeorgeQLe/mobile-ideas --visibility public` only after explicit approval.

## Batch Execution Todo

- [ ] Reconcile the existing `GeorgeQLe/todoist-mobile-clone` repo with the seed structure below.
- [ ] Dry-run the seeding process on one low-risk non-Todoist repo, preferably a productivity or notes app.
- [ ] Seed Batch 01 repos with `gh repo create`, docs scaffolds, source specs, commits, and push.
- [ ] Seed Batch 02 repos with `gh repo create`, docs scaffolds, source specs, commits, and push.
- [ ] Seed Batch 03 repos with `gh repo create`, docs scaffolds, source specs, commits, and push.
- [ ] Seed Batch 04 repos with `gh repo create`, docs scaffolds, source specs, commits, and push.
- [ ] Seed Batch 05 repos with `gh repo create`, docs scaffolds, source specs, commits, and push.
- [ ] Verify all 100 target repos exist and link back to this spec store.

## Execution Status And Evidence Log

### Step 6.1 Audit - 2026-04-20

- Manifest evidence: `tasks/repo-seeding.md` contains 100 downstream target rows.
- Existing repo evidence: exactly one target row is checked, `GeorgeQLe/todoist-mobile-clone`.
- Source-spec evidence: every manifest `Source Spec` path exists under `specs/`.
- Command-pattern evidence: the reusable `gh repo create ... --private --clone=false` pattern remains documented above, followed by clone, docs scaffold, commit, and push steps.
- Privacy decision: all downstream repos remain private by default; public visibility is refused until the relevant legal/name/license review is complete and the user explicitly approves public release.

### Selected Dry-Run Target

- Target app: Evernote.
- Target repo: `GeorgeQLe/evernote-mobile-clone`.
- Source spec: `specs/batch-05/093-evernote.md`.
- Selection rationale: Evernote is a non-Todoist productivity/notes app, matching the preferred dry-run category. The private seed can exercise notes, notebook, task, search, attachment, sharing, offline, and entitlement planning surfaces without using proprietary assets, screenshots, logos, production credentials, real user data, payment movement, health data, regulated finance, smart-home hardware, or public repo visibility.
- Required guardrails for the dry run: create private only, seed docs only, use original non-affiliation language, copy only the source spec from this spec store, and keep manual verification blockers unresolved until lawful hands-on evidence exists.

### Batch Progress

- Dry-run target selected: `GeorgeQLe/evernote-mobile-clone`.
- Reusable downstream templates: ready under `templates/downstream/`.
- Dry-run execution: pending local seeding utility.
- Todoist reconciliation: pending shared seed templates.
- Batch creation: not started.

### Failures And Blockers

- No Step 6.1 manifest, source-spec, or checked-row blockers found.
- GitHub authentication is not checked until Step 6.5; if `gh auth status` fails then, complete the manual task in `tasks/manual-todo.md`.
- Human review may still be needed for repo-name or visibility questions recorded during later automated runs.

### Explicit Private-Repo Decisions

- Do not use `--public` in the seeding utility.
- Do not make `GeorgeQLe/mobile-ideas` public until the open-source spec-store checklist is complete and the manual approval task is checked.
- Do not make any downstream implementation repo public until it has original code/assets and its own legal/name/license review.

## Per-Repo Checklist

| Done | ID | App | Target Repo | Source Spec |
|---|---:|---|---|---|
| [ ] | 001 | ChatGPT | `GeorgeQLe/chatgpt-mobile-clone` | `specs/batch-01/001-chatgpt.md` |
| [ ] | 002 | Claude | `GeorgeQLe/claude-mobile-clone` | `specs/batch-01/002-claude.md` |
| [ ] | 003 | Perplexity | `GeorgeQLe/perplexity-mobile-clone` | `specs/batch-01/003-perplexity.md` |
| [ ] | 004 | Character.AI | `GeorgeQLe/character-ai-mobile-clone` | `specs/batch-01/004-character-ai.md` |
| [ ] | 005 | Replika | `GeorgeQLe/replika-mobile-clone` | `specs/batch-01/005-replika.md` |
| [ ] | 006 | TikTok | `GeorgeQLe/tiktok-mobile-clone` | `specs/batch-01/006-tiktok.md` |
| [ ] | 007 | Instagram | `GeorgeQLe/instagram-mobile-clone` | `specs/batch-01/007-instagram.md` |
| [ ] | 008 | Snapchat | `GeorgeQLe/snapchat-mobile-clone` | `specs/batch-01/008-snapchat.md` |
| [ ] | 009 | BeReal | `GeorgeQLe/bereal-mobile-clone` | `specs/batch-01/009-bereal.md` |
| [ ] | 010 | Reddit | `GeorgeQLe/reddit-mobile-clone` | `specs/batch-01/010-reddit.md` |
| [ ] | 011 | X | `GeorgeQLe/x-mobile-clone` | `specs/batch-01/011-x.md` |
| [ ] | 012 | Bluesky | `GeorgeQLe/bluesky-mobile-clone` | `specs/batch-01/012-bluesky.md` |
| [ ] | 013 | Threads | `GeorgeQLe/threads-mobile-clone` | `specs/batch-01/013-threads.md` |
| [ ] | 014 | Pinterest | `GeorgeQLe/pinterest-mobile-clone` | `specs/batch-01/014-pinterest.md` |
| [ ] | 015 | Lemon8 | `GeorgeQLe/lemon8-mobile-clone` | `specs/batch-01/015-lemon8.md` |
| [ ] | 016 | WhatsApp | `GeorgeQLe/whatsapp-mobile-clone` | `specs/batch-01/016-whatsapp.md` |
| [ ] | 017 | Telegram | `GeorgeQLe/telegram-mobile-clone` | `specs/batch-01/017-telegram.md` |
| [ ] | 018 | Signal | `GeorgeQLe/signal-mobile-clone` | `specs/batch-01/018-signal.md` |
| [ ] | 019 | Discord | `GeorgeQLe/discord-mobile-clone` | `specs/batch-01/019-discord.md` |
| [ ] | 020 | Slack | `GeorgeQLe/slack-mobile-clone` | `specs/batch-01/020-slack.md` |
| [ ] | 021 | Messenger | `GeorgeQLe/messenger-mobile-clone` | `specs/batch-02/021-messenger.md` |
| [ ] | 022 | FaceTime | `GeorgeQLe/facetime-mobile-clone` | `specs/batch-02/022-facetime.md` |
| [ ] | 023 | Zoom | `GeorgeQLe/zoom-mobile-clone` | `specs/batch-02/023-zoom.md` |
| [ ] | 024 | Gmail | `GeorgeQLe/gmail-mobile-clone` | `specs/batch-02/024-gmail.md` |
| [ ] | 025 | Outlook | `GeorgeQLe/outlook-mobile-clone` | `specs/batch-02/025-outlook.md` |
| [ ] | 026 | Google Maps | `GeorgeQLe/google-maps-mobile-clone` | `specs/batch-02/026-google-maps.md` |
| [ ] | 027 | Apple Maps | `GeorgeQLe/apple-maps-mobile-clone` | `specs/batch-02/027-apple-maps.md` |
| [ ] | 028 | Waze | `GeorgeQLe/waze-mobile-clone` | `specs/batch-02/028-waze.md` |
| [ ] | 029 | Uber | `GeorgeQLe/uber-mobile-clone` | `specs/batch-02/029-uber.md` |
| [ ] | 030 | Lyft | `GeorgeQLe/lyft-mobile-clone` | `specs/batch-02/030-lyft.md` |
| [ ] | 031 | Lime | `GeorgeQLe/lime-mobile-clone` | `specs/batch-02/031-lime.md` |
| [ ] | 032 | Turo | `GeorgeQLe/turo-mobile-clone` | `specs/batch-02/032-turo.md` |
| [ ] | 033 | Airbnb | `GeorgeQLe/airbnb-mobile-clone` | `specs/batch-02/033-airbnb.md` |
| [ ] | 034 | Booking.com | `GeorgeQLe/booking-com-mobile-clone` | `specs/batch-02/034-booking-com.md` |
| [ ] | 035 | Expedia | `GeorgeQLe/expedia-mobile-clone` | `specs/batch-02/035-expedia.md` |
| [ ] | 036 | Hopper | `GeorgeQLe/hopper-mobile-clone` | `specs/batch-02/036-hopper.md` |
| [ ] | 037 | TripIt | `GeorgeQLe/tripit-mobile-clone` | `specs/batch-02/037-tripit.md` |
| [ ] | 038 | DoorDash | `GeorgeQLe/doordash-mobile-clone` | `specs/batch-02/038-doordash.md` |
| [ ] | 039 | Uber Eats | `GeorgeQLe/uber-eats-mobile-clone` | `specs/batch-02/039-uber-eats.md` |
| [ ] | 040 | Instacart | `GeorgeQLe/instacart-mobile-clone` | `specs/batch-02/040-instacart.md` |
| [ ] | 041 | Starbucks | `GeorgeQLe/starbucks-mobile-clone` | `specs/batch-03/041-starbucks.md` |
| [ ] | 042 | McDonald's | `GeorgeQLe/mcdonalds-mobile-clone` | `specs/batch-03/042-mcdonalds.md` |
| [ ] | 043 | OpenTable | `GeorgeQLe/opentable-mobile-clone` | `specs/batch-03/043-opentable.md` |
| [ ] | 044 | Yelp | `GeorgeQLe/yelp-mobile-clone` | `specs/batch-03/044-yelp.md` |
| [ ] | 045 | Too Good To Go | `GeorgeQLe/too-good-to-go-mobile-clone` | `specs/batch-03/045-too-good-to-go.md` |
| [ ] | 046 | Amazon | `GeorgeQLe/amazon-mobile-clone` | `specs/batch-03/046-amazon.md` |
| [ ] | 047 | Temu | `GeorgeQLe/temu-mobile-clone` | `specs/batch-03/047-temu.md` |
| [ ] | 048 | SHEIN | `GeorgeQLe/shein-mobile-clone` | `specs/batch-03/048-shein.md` |
| [ ] | 049 | Etsy | `GeorgeQLe/etsy-mobile-clone` | `specs/batch-03/049-etsy.md` |
| [ ] | 050 | eBay | `GeorgeQLe/ebay-mobile-clone` | `specs/batch-03/050-ebay.md` |
| [ ] | 051 | Facebook Marketplace | `GeorgeQLe/facebook-marketplace-mobile-clone` | `specs/batch-03/051-facebook-marketplace.md` |
| [ ] | 052 | Poshmark | `GeorgeQLe/poshmark-mobile-clone` | `specs/batch-03/052-poshmark.md` |
| [ ] | 053 | Depop | `GeorgeQLe/depop-mobile-clone` | `specs/batch-03/053-depop.md` |
| [ ] | 054 | StockX | `GeorgeQLe/stockx-mobile-clone` | `specs/batch-03/054-stockx.md` |
| [ ] | 055 | Shop | `GeorgeQLe/shop-mobile-clone` | `specs/batch-03/055-shop.md` |
| [ ] | 056 | Cash App | `GeorgeQLe/cash-app-mobile-clone` | `specs/batch-03/056-cash-app.md` |
| [ ] | 057 | Venmo | `GeorgeQLe/venmo-mobile-clone` | `specs/batch-03/057-venmo.md` |
| [ ] | 058 | PayPal | `GeorgeQLe/paypal-mobile-clone` | `specs/batch-03/058-paypal.md` |
| [ ] | 059 | Zelle | `GeorgeQLe/zelle-mobile-clone` | `specs/batch-03/059-zelle.md` |
| [ ] | 060 | Robinhood | `GeorgeQLe/robinhood-mobile-clone` | `specs/batch-03/060-robinhood.md` |
| [ ] | 061 | Coinbase | `GeorgeQLe/coinbase-mobile-clone` | `specs/batch-04/061-coinbase.md` |
| [ ] | 062 | Mint/Credit Karma | `GeorgeQLe/mint-credit-karma-mobile-clone` | `specs/batch-04/062-mint-credit-karma.md` |
| [ ] | 063 | YNAB | `GeorgeQLe/ynab-mobile-clone` | `specs/batch-04/063-ynab.md` |
| [ ] | 064 | Rocket Money | `GeorgeQLe/rocket-money-mobile-clone` | `specs/batch-04/064-rocket-money.md` |
| [ ] | 065 | Apple Wallet | `GeorgeQLe/apple-wallet-mobile-clone` | `specs/batch-04/065-apple-wallet.md` |
| [ ] | 066 | Spotify | `GeorgeQLe/spotify-mobile-clone` | `specs/batch-04/066-spotify.md` |
| [ ] | 067 | Apple Music | `GeorgeQLe/apple-music-mobile-clone` | `specs/batch-04/067-apple-music.md` |
| [ ] | 068 | YouTube Music | `GeorgeQLe/youtube-music-mobile-clone` | `specs/batch-04/068-youtube-music.md` |
| [ ] | 069 | SoundCloud | `GeorgeQLe/soundcloud-mobile-clone` | `specs/batch-04/069-soundcloud.md` |
| [ ] | 070 | Audible | `GeorgeQLe/audible-mobile-clone` | `specs/batch-04/070-audible.md` |
| [ ] | 071 | Pocket Casts | `GeorgeQLe/pocket-casts-mobile-clone` | `specs/batch-04/071-pocket-casts.md` |
| [ ] | 072 | Netflix | `GeorgeQLe/netflix-mobile-clone` | `specs/batch-04/072-netflix.md` |
| [ ] | 073 | YouTube | `GeorgeQLe/youtube-mobile-clone` | `specs/batch-04/073-youtube.md` |
| [ ] | 074 | Twitch | `GeorgeQLe/twitch-mobile-clone` | `specs/batch-04/074-twitch.md` |
| [ ] | 075 | Letterboxd | `GeorgeQLe/letterboxd-mobile-clone` | `specs/batch-04/075-letterboxd.md` |
| [ ] | 076 | IMDb | `GeorgeQLe/imdb-mobile-clone` | `specs/batch-04/076-imdb.md` |
| [ ] | 077 | Duolingo | `GeorgeQLe/duolingo-mobile-clone` | `specs/batch-04/077-duolingo.md` |
| [ ] | 078 | Khan Academy | `GeorgeQLe/khan-academy-mobile-clone` | `specs/batch-04/078-khan-academy.md` |
| [ ] | 079 | Quizlet | `GeorgeQLe/quizlet-mobile-clone` | `specs/batch-04/079-quizlet.md` |
| [ ] | 080 | Coursera | `GeorgeQLe/coursera-mobile-clone` | `specs/batch-04/080-coursera.md` |
| [ ] | 081 | Photomath | `GeorgeQLe/photomath-mobile-clone` | `specs/batch-05/081-photomath.md` |
| [ ] | 082 | Headspace | `GeorgeQLe/headspace-mobile-clone` | `specs/batch-05/082-headspace.md` |
| [ ] | 083 | Calm | `GeorgeQLe/calm-mobile-clone` | `specs/batch-05/083-calm.md` |
| [ ] | 084 | Strava | `GeorgeQLe/strava-mobile-clone` | `specs/batch-05/084-strava.md` |
| [ ] | 085 | Nike Run Club | `GeorgeQLe/nike-run-club-mobile-clone` | `specs/batch-05/085-nike-run-club.md` |
| [ ] | 086 | MyFitnessPal | `GeorgeQLe/myfitnesspal-mobile-clone` | `specs/batch-05/086-myfitnesspal.md` |
| [ ] | 087 | Fitbit | `GeorgeQLe/fitbit-mobile-clone` | `specs/batch-05/087-fitbit.md` |
| [ ] | 088 | Flo | `GeorgeQLe/flo-mobile-clone` | `specs/batch-05/088-flo.md` |
| [ ] | 089 | Notion | `GeorgeQLe/notion-mobile-clone` | `specs/batch-05/089-notion.md` |
| [x] | 090 | Todoist | `GeorgeQLe/todoist-mobile-clone` | `specs/batch-05/090-todoist.md` |
| [ ] | 091 | Trello | `GeorgeQLe/trello-mobile-clone` | `specs/batch-05/091-trello.md` |
| [ ] | 092 | Google Calendar | `GeorgeQLe/google-calendar-mobile-clone` | `specs/batch-05/092-google-calendar.md` |
| [ ] | 093 | Evernote | `GeorgeQLe/evernote-mobile-clone` | `specs/batch-05/093-evernote.md` |
| [ ] | 094 | Dropbox | `GeorgeQLe/dropbox-mobile-clone` | `specs/batch-05/094-dropbox.md` |
| [ ] | 095 | Google Drive | `GeorgeQLe/google-drive-mobile-clone` | `specs/batch-05/095-google-drive.md` |
| [ ] | 096 | CapCut | `GeorgeQLe/capcut-mobile-clone` | `specs/batch-05/096-capcut.md` |
| [ ] | 097 | Canva | `GeorgeQLe/canva-mobile-clone` | `specs/batch-05/097-canva.md` |
| [ ] | 098 | Lightroom | `GeorgeQLe/lightroom-mobile-clone` | `specs/batch-05/098-lightroom.md` |
| [ ] | 099 | Google Photos | `GeorgeQLe/google-photos-mobile-clone` | `specs/batch-05/099-google-photos.md` |
| [ ] | 100 | Ring | `GeorgeQLe/ring-mobile-clone` | `specs/batch-05/100-ring.md` |

## Next Steps

- Review repo names for legal/public-facing suitability before creating public repos.
- Create private downstream repos by batch after the dry-run seed passes.
- Keep this repository as the canonical spec store and publish it only after the open-source checklist is complete.
