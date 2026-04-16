# Apple Wallet-Style Clone Spec

## Legal Scope
- Build a wallet for passes, tickets, cards, and receipts with original branding and UI.
- Do not copy Apple marks, pass formats, secure element behavior, or proprietary provisioning flows.
- Initial payment-card support should be mock or sandbox only.
- Any transit, ID, or key feature must be gated behind lawful local integration.

## Product Goal
- Let a user store useful credentials in one place and surface them at the moment of use.
- Make scanning, tap-to-open, and time-sensitive pass surfacing the primary interaction model.

## Research Verification Checklist
- Verify pass add, grouping, ordering, and expiry behavior from public app docs.
- Verify boarding pass, event ticket, loyalty card, and transit card surfaces by observation.
- Verify lock-screen surfacing, notification timing, and expiration handling.
- Verify wallet settings, device switching, and privacy language from support pages.

## Core User Journeys
- User adds a pass from a link, QR scan, or issuer import.
- User opens Wallet, finds a pass quickly, and presents it at a venue or terminal.
- User receives an update or expiration notification and views the revised pass.
- User archives, hides, or deletes an unused pass.
- User manages notification, defaults, and privacy settings.

## Screen Inventory
| Screen | Purpose | Key Inputs | States | Edge Cases |
|---|---|---|---|---|
| Home | Pass gallery | None | Active, empty | Many passes |
| Add Pass | Import entry | QR, link, file | Available, failed | Unsupported issuer |
| Pass Detail | Pass metadata and barcode | None | Current, expired | Time-based refresh |
| Card Detail | Payment card placeholder | Last four, issuer | Active, locked | Device not provisioned |
| Transit/Ticket | Time-sensitive credential | Route, seat, zone | Valid, expired | Offline validation |
| Notifications | Updates and reminders | Preferences | Enabled, muted | Duplicate alert |
| History | Recent scans and updates | Filters | Populated, empty | Privacy redaction |
| Settings | Default app and privacy | Toggles | Editable | Restricted region |

## Functional Requirements
- Support pass ingestion from file, link, QR, or issuer API placeholder.
- Organize passes into cards, tickets, loyalty, transit, and generic credentials.
- Render pass details, barcodes, QR codes, and expiration metadata.
- Surface relevant passes based on time, location, or event date when permitted.
- Allow archive, delete, hide, and reorder actions.
- Support card placeholder management without exposing raw sensitive credentials.
- Support update pushes for changed event times, gate changes, or balance data.

## Data Model
- `Pass`: type, issuer, display name, expiration, status.
- `PassField`: label, value, sensitive flag, display order.
- `BarcodeCredential`: format, payload, scan state.
- `CardPlaceholder`: issuer, last four, network, device token state.
- `PassUpdate`: change type, effective date, delivery status.
- `ScanEvent`: source, timestamp, validation result.

## API/Backend Contracts
- `POST /passes/import`, `GET /passes`, `GET /passes/{id}`, `DELETE /passes/{id}`.
- `POST /passes/{id}/archive`, `POST /passes/{id}/hide`, `POST /passes/reorder`.
- `GET /passes/{id}/updates`, `POST /passes/{id}/acknowledge`.
- `GET /card-placeholder`, `POST /card-placeholder/provision`.
- Prefer issuer-signed payloads and short-lived update tokens.

## Realtime/Push/Offline
- Push for pass updates, expiration warnings, and event changes.
- Cache all pass metadata and barcodes offline.
- Make scan-ready barcodes available without network access.

## Permissions/Privacy/Safety
- Request camera for QR import only when needed.
- Request location only for optional pass suggestions, never by default.
- Redact pass payloads and scan logs from analytics.
- Require device authentication before revealing sensitive pass fields.

## Analytics Events
- `pass_imported`, `pass_viewed`, `pass_archived`, `pass_deleted`
- `barcode_scanned`, `pass_updated`, `notification_enabled`, `default_changed`

## Monetization
- Keep core wallet functions free.
- Any issuer or premium surface should be represented as a separate entitlement layer.

## Acceptance Tests
- User can import a pass from a QR code and see it in the gallery.
- User can open a pass offline and still show the barcode.
- User can archive and restore a pass from settings.
- User can receive an update notification for an expired or changed pass.
- User can provision a payment-card placeholder without exposing raw card data.

## Implementation Notes
- Treat passes as signed payloads with a local rendering layer.
- Keep sensitive fields encrypted at rest and render them only after auth.
- Use stable pass ordering so scan time does not reshuffle the gallery unexpectedly.
