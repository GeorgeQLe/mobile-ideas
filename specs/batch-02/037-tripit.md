# TripIt-Style Clone Spec

## Legal Scope
- Clone objective: itinerary organizer that imports travel confirmations, builds a timeline, stores documents, and surfaces alerts.
- Must not copy: TripIt branding, proprietary email ingestion, or supplier data.
- Original replacement brand: neutral itinerary product with owned copy and media.

## Product Goal
- Turn scattered travel confirmations into a single trip timeline.
- Help users access flights, hotels, car rentals, and documents on one screen.
- Provide calendar sync and alerts without requiring manual re-entry.

## Research Verification Checklist
- Verify email import behavior, trip timeline sections, and document attachment handling.
- Verify calendar sync, collaboration, and travel alert surface.
- Verify whether seat tracking or point tracking belongs in scope.
- Verification status: not yet researched.

## Core User Journeys
- Connect email or forward a confirmation and see it parsed into a trip.
- Review a trip timeline, open documents, and view alerts.
- Share itinerary details with another traveler.
- Sync trip events to a calendar and manage updates.

## Screen Inventory
| Screen | Purpose | Inputs | States | Edge Cases |
|---|---|---|---|---|
| Trip List | All itineraries | search, add trip | populated, empty | duplicate trip |
| Trip Detail | Timeline view | edit, share, documents | open, archived | partial import |
| Import | Add confirmations | email, code | processing, done | parse failure |
| Documents | Store files | upload, scan | available, empty | bad file |
| Alerts | Flight and trip alerts | read, dismiss | new, read | delayed feed |
| Calendar Sync | External calendar link | connect, disconnect | synced, error | permissions denied |
| Sharing | Share trip info | traveler, link | sent, revoked | expired link |

## Functional Requirements
- Import confirmations from email or manual entry.
- Parse itinerary items into flights, hotels, cars, and notes.
- Store travel documents with secure access.
- Sync trip dates and events to calendars and shareable itineraries.

## Data Model
- Trip, TripItem, ImportedConfirmation, Document, Alert, CalendarLink, SharedAccess, Traveler, TravelProvider.
- TripItem stores provider, timestamps, and location metadata.
- ImportedConfirmation stores source, parse status, and raw-text retention rules.

## API/Backend Contracts
- Auth: account session plus optional email access token or forwarding inbox.
- Reads: `/trips`, `/trip-items`, `/documents`, `/alerts`, `/calendar-links`, `/shares`.
- Writes: import confirmation, add note, upload document, share trip, sync calendar, dismiss alert.
- Realtime: new alert delivery, itinerary updates, and share revocation.

## Realtime/Push/Offline
- Push on flight changes, hotel check-in reminders, and document updates.
- Cache trip timelines and documents for offline access.
- Import jobs should resume after network loss without duplicating entries.

## Permissions/Privacy/Safety
- Request calendar, email access, notifications, and camera only when the user opts into those features.
- Encrypt documents and support share revocation.
- Make parsing rules explicit so imported data can be corrected.

## Analytics Events
- `trip_created`, `confirmation_imported`, `trip_opened`, `document_added`, `calendar_synced`, `alert_received`, `share_sent`, `share_revoked`.

## Monetization
- Freemium trip management with premium alerts, storage, or calendar automation.
- Keep all paid features separate from essential itinerary access.

## Acceptance Tests
- Import a confirmation email and confirm the timeline is created.
- Add a document and open it offline.
- Share a trip and revoke access.
- Sync to calendar and verify update propagation.

## Implementation Notes
- Build parsers as adapters so new travel providers can be added safely.
- Keep manual edits possible because import will never be perfect.
- Treat alerts as a separate event stream from trip content.

