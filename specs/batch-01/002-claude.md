# Claude-Style Reasoning Assistant Clone Spec

## Legal Scope
- Clone objective: build a long-form assistant with thread organization, document analysis, project knowledge, and artifact-style generated outputs.
- Must not copy: Anthropic branding, logo, model names, proprietary policies, or private workspace features.
- Replacement brand/assets: use original app copy, iconography, and workspace naming.

## Product Goal
- Help a user work through long tasks, upload documents, and keep related threads grouped by project.
- Bias toward clear, careful answers with source separation and editable outputs.

## Research Verification Checklist
- [ ] Current navigation, project grouping, and thread pinning behavior
- [ ] Document upload limits, file types, and output formats
- [ ] Artifact/document workspace behavior
- [ ] Model options and plan gating
- [ ] Mobile share/export and copy formatting
- [ ] Safety policy prompts and refusal patterns
- [ ] Search across conversations and project files
- [ ] Offline cache and retry behavior

## Core User Journeys
- User creates a project, starts a thread, and uploads a spec or PDF.
- User asks for analysis, then edits the generated answer into a reusable document.
- User returns to a project and searches prior threads or files.
- User shares a generated output or exports it as text/PDF.
- User toggles memory or project knowledge settings.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Welcome/Auth | Create session | new, returning, error |
| Projects | Group related work | empty, list, archived |
| Thread View | Ask and refine | streaming, edited, failed |
| File Viewer | Inspect uploaded docs | loading, annotated, unsupported |
| Artifact Editor | Edit generated output | draft, saved, locked |
| Search | Find threads/files | no results, scoped results |
| Settings | Manage privacy and model | default, custom, restricted |
| Billing | Show limits and upgrade | free, trial, paid |

## Functional Requirements
- Persist threads under projects with custom titles, tags, and pinned status.
- Support long context prompts with document citations and extracted quotes.
- Enable document upload, OCR/text extraction, and per-file visibility rules.
- Provide editable artifacts that can be copied into a document view.
- Support code blocks, tables, and structured output rendering on mobile.
- Allow thread search by keyword, file name, and project label.
- Preserve message revision history and regenerate alternatives.

## Data Model
- User: id, email, plan, safety settings, default model.
- Project: id, owner_id, name, color, archived_at.
- Thread: id, project_id, title, pinned, last_activity_at.
- Message: id, thread_id, role, content, revision_of, citations.
- Document: id, project_id, filename, mime, page_count, extracted_text.
- Artifact: id, thread_id, type, content, version, locked.

## API/Backend Contracts
- `POST /projects`, `GET /projects`, `PATCH /projects/:id`.
- `GET /threads?project_id=`, `POST /threads`, `PATCH /threads/:id`.
- `POST /threads/:id/messages`, `GET /threads/:id/messages`.
- `POST /documents/upload-url`, `POST /documents/:id/process`.
- `GET /search?q=`, `GET /artifacts/:id`, `PATCH /artifacts/:id`.
- Use streamed response transport with resumable assistant generation ids.

## Realtime/Push/Offline
- Stream answer generation and doc processing status.
- Push on long-running completion, share activity, and subscription events.
- Cache recent projects, threads, and extracted document text offline.
- Queue drafts locally and sync when connectivity returns.

## Permissions/Privacy/Safety
- Request file access only on upload action and camera only for capture mode.
- Let users delete project content, redact files, and disable memory-like features.
- Filter for unsafe requests and clearly separate user-provided from generated text.
- Avoid retaining sensitive uploads longer than user settings allow.

## Analytics Events
- `project_created`, `thread_started`, `document_uploaded`, `document_processed`
- `artifact_opened`, `artifact_saved`, `search_performed`, `message_regenerated`
- `plan_viewed`, `plan_upgraded`, `content_deleted`

## Monetization
- Free tier with smaller context, limited uploads, and slower processing.
- Paid tier with more projects, larger files, longer threads, and artifact editing.

## Acceptance Tests
- User can create a project, upload a file, and ask questions about it.
- User can reopen a thread and see the full editable history.
- User can export an artifact without losing formatting.
- User can search across projects and retrieve a matching thread.
- Offline draft survives app restart and sends when network returns.

## Implementation Notes
- Separate project metadata from thread content so search and permissions stay simple.
- Keep artifacts versioned; never overwrite the only copy of a generated document.
- Use OCR/extraction jobs asynchronously and render a clear processing state.
- Verify exact project/artifact naming and any plan limits with direct research.

