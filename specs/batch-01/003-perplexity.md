# Perplexity-Style Answer Search Clone Spec

## Legal Scope
- Clone objective: create a search-first answer engine with citations, follow-up prompts, collections, and persistent threads.
- Must not copy: Perplexity branding, ranking code, source curation rules, logos, or proprietary search partnerships.
- Replacement brand/assets: use original search branding, answer cards, and source UI.

## Product Goal
- Let a user ask a question and get a concise answer backed by visible sources they can inspect and refine.
- Keep search, conversation, and saved collections in one mobile flow.

## Research Verification Checklist
- [ ] Search result card layout and citation behavior
- [ ] Follow-up prompt generation and thread persistence
- [ ] Collections, bookmarks, and share links
- [ ] Source card preview and open-in-browser flow
- [ ] Plan gates for pro search or file upload
- [ ] Regional search, recency, and personalization options
- [ ] Mobile offline/poor-network handling
- [ ] Safety and source quality indicators

## Core User Journeys
- User types a question and receives an answer with citations and source cards.
- User opens a source, asks a follow-up, and continues the same thread.
- User saves a result to a collection and shares the thread.
- User refines search with recency or domain constraints.
- User deletes history or clears a saved collection.

## Screen Inventory
| Screen | Purpose | Key States |
|---|---|---|
| Search Home | Enter query | empty, suggested, recent |
| Answer Thread | Read answer and sources | streaming, cited, stale |
| Source Viewer | Inspect source cards | open, blocked, unavailable |
| Collections | Save and organize threads | empty, list, reorder |
| Follow-up | Continue question flow | prompt, suggested, custom |
| History | Browse prior searches | recent, archived, deleted |
| Settings | Search and privacy controls | default, restricted |
| Upgrade | Pro limits and billing | free, paid, expired |

## Functional Requirements
- Return an answer object with summary text, citations, source metadata, and confidence hints.
- Support follow-up questions within the same thread without losing the original query context.
- Store source URLs, titles, excerpts, and publication dates separately from generated text.
- Allow save-to-collection, share-link creation, and history deletion.
- Support domain filters, recency filters, and region-aware search settings.
- Detect stale answers and offer refresh or re-search.

## Data Model
- QueryThread: id, user_id, query, filters, created_at, updated_at.
- Answer: id, thread_id, summary, status, refreshed_at.
- Citation: id, answer_id, source_url, title, excerpt, rank, fetched_at.
- Collection: id, user_id, name, description, item_count.
- SavedItem: id, collection_id, thread_id, note.
- SearchPreference: id, user_id, region, recency_window, safe_search.

## API/Backend Contracts
- `POST /search/query` returns thread id, streamed answer chunks, and citation payloads.
- `GET /threads/:id`, `GET /threads/:id/citations`, `POST /threads/:id/followups`.
- `GET /sources/fetch?url=` for cached source previews with extraction limits.
- `POST /collections`, `POST /collections/:id/items`, `DELETE /threads/:id`.
- Include rate limits and query safety checks on all public search endpoints.

## Realtime/Push/Offline
- Stream the answer and citation hydration separately so the UI can render progressively.
- Push on collection shares and billing notices only.
- Cache recent queries, answer summaries, and source metadata offline.
- Retry source fetches and query refreshes when network returns.

## Permissions/Privacy/Safety
- Do not expose private browsing history or source content beyond requested URLs.
- Flag unsafe or low-confidence answers and route them through a safer response mode.
- Avoid storing personally sensitive queries in analytics payloads.
- Respect regional and account-level safe search settings.

## Analytics Events
- `query_submitted`, `answer_stream_started`, `citation_clicked`, `source_opened`
- `followup_submitted`, `collection_saved`, `search_refined`, `answer_refreshed`
- `pro_upgrade_viewed`, `pro_upgrade_completed`

## Monetization
- Free tier with limited queries, slower refresh, and fewer attachments or pro modes.
- Paid tier with higher query volume, faster refresh, and advanced filters.

## Acceptance Tests
- A question returns a concise answer with at least one source card when sources exist.
- A follow-up continues the same thread and preserves prior citations.
- A saved collection can be reopened after restart.
- A stale answer can be refreshed and the UI updates citations.
- Offline history loads and queued follow-up sends after reconnect.

## Implementation Notes
- Treat answer generation as a composite of search, ranking, and summary rendering.
- Store citations as first-class records so tests can assert source provenance.
- Keep filters deterministic and visible to the user.
- Verify the exact source-card and collection behavior against live app observation.

