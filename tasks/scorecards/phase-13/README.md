# Phase 13 Benchmark Scorecards

Generated: 2026-05-15T02:58:25.706Z
Run ID: `phase-13-local-2026-05-15`

## Summary

- Total benchmark targets: 215
- Scorecards produced: 15
- Blocker records produced: 200
- Average composite across scored variants: 5.30
- GitHub Actions used: no

## Accounting By Implementation Status

| Status | Repos |
| --- | ---: |
| implemented | 5 |
| scaffold-only | 38 |

## Accounting By Variant

| Variant | Scorecards | Blockers |
| --- | ---: | ---: |
| react-native | 5 | 38 |
| flutter | 0 | 43 |
| expo | 5 | 38 |
| ios-native | 5 | 38 |
| android-native | 0 | 43 |

## Blockers By Reason

| Reason | Count |
| --- | ---: |
| missing-local-flutter-toolchain | 5 |
| missing-local-android-toolchain | 5 |
| implementation-not-started | 190 |

## Scorecards

| ID | App | Variant | Composite | File |
| ---: | --- | --- | ---: | --- |
| 016 | WhatsApp | ios-native | 9.23 | tasks/scorecards/phase-13/016-whatsapp-ios-native.json |
| 017 | Telegram | ios-native | 9.23 | tasks/scorecards/phase-13/017-telegram-ios-native.json |
| 018 | Signal | ios-native | 9.23 | tasks/scorecards/phase-13/018-signal-ios-native.json |
| 019 | Discord | ios-native | 9.23 | tasks/scorecards/phase-13/019-discord-ios-native.json |
| 020 | Slack | ios-native | 9.23 | tasks/scorecards/phase-13/020-slack-ios-native.json |
| 016 | WhatsApp | expo | 3.33 | tasks/scorecards/phase-13/016-whatsapp-expo.json |
| 016 | WhatsApp | react-native | 3.33 | tasks/scorecards/phase-13/016-whatsapp-react-native.json |
| 017 | Telegram | expo | 3.33 | tasks/scorecards/phase-13/017-telegram-expo.json |
| 017 | Telegram | react-native | 3.33 | tasks/scorecards/phase-13/017-telegram-react-native.json |
| 018 | Signal | expo | 3.33 | tasks/scorecards/phase-13/018-signal-expo.json |
| 018 | Signal | react-native | 3.33 | tasks/scorecards/phase-13/018-signal-react-native.json |
| 019 | Discord | expo | 3.33 | tasks/scorecards/phase-13/019-discord-expo.json |
| 019 | Discord | react-native | 3.33 | tasks/scorecards/phase-13/019-discord-react-native.json |
| 020 | Slack | expo | 3.33 | tasks/scorecards/phase-13/020-slack-expo.json |
| 020 | Slack | react-native | 3.33 | tasks/scorecards/phase-13/020-slack-react-native.json |

## Notes

- Scorecards are generated only for variants with Step 13.6 executable validation evidence.
- Flutter and Android Native targets remain local-toolchain blocked and have blocker records instead of invented benchmark scores.
- The 38 scaffold-only repos are represented as implementation blockers for every variant until implementation evidence exists.
- The harness uses local source structure and available report files as conservative proxies when device, accessibility, or store-compliance reports are absent.
- No GitHub Actions workflows were created, modified, enabled, dispatched, or used.
