---
title: Best Practices
---

Short recommendations for integrating with the Rad TV API.

## Use DIDs everywhere

Use **DIDs** as the canonical ID for channels and content (e.g. `did:rad.live:channel/<uuid>`, `did:rad.live:content/feature/<id>`). Do not mix raw content-metadata or 12core IDs with DIDs in client flows.

## Channel catalog: use features, not content

Channels do **not** have a legacy `content` field. Use:

* `channel.features(limit, start)`
* `channel.series(limit, start)`
* `channel.episodes(limit, start)`
* `channel.streams(limit, start)`
* `channel.seasons(limit, start)`
* `channel.miniseries(limit, start)`

Catalog types (Feature, Episode, Stream, Serie, Season, Miniseries) implement Likeable and Commentable (id, likes, commentCount, comments).

## Rely on nullability in the schema

The schema uses `!` for non-null fields. Use this when writing clients:

* **Content:** `metadata`, `assets`, `likes`, and `commentCount` are never null. `assets` may have empty `videos`/`images` before upload. `transcodeJob` and `outputAssets` are null when not processing or not available.
* **Single-entity queries:** `channel(id)`, `feature(id)`, `stream(id)`, etc. return **null** when the entity is not found or not accessible. Check for null before using the result.

Generated TypeScript types (from `npm run codegen`) reflect the schema.

## Handle both data and errors

* **GraphQL:** Responses are `{ data?, errors? }`. Always check `response.errors`; the HTTP status may still be 200 when there are field errors. Use `response.data` for the result.
* **REST/Internal:** Success uses `{ data: <payload> }`; errors use `{ errors: [ { message, code? } ] }`.

## Use API keys for automation

For MCP, scripts, or long-lived access, use an **API key** (from `POST /internal/v0/generate-api-key`) instead of a user JWT. JWTs are for user sessions; API keys are for programmatic and IDE integration.

## Discover the schema

Use **introspection** against `POST /graphql` or the Altair playground at `/altair` (in development) to explore the full schema. This helps avoid trial-and-error when building queries.

## Pagination

List queries use `limit` and `start` (offset). There is no cursor-based pagination or total count in the schema. Implement "next page" by incrementing `start` by `limit` until you get fewer results than `limit` or an empty list.
