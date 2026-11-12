---
title: GraphQL
---

The Rad TV API exposes a **GraphQL** endpoint for all core operations: identity, channels, catalog, content, playlists, engagement, and YouTube.

## Endpoint

```
POST /graphql
```

Send a JSON body with `query` (and optionally `variables`, `operationName`). Include the Bearer token for authenticated operations:

```
Authorization: Bearer <token>
Content-Type: application/json
```

## Authentication

Most queries and mutations require authentication via `Authorization: Bearer <jwt-or-api-key>`. The schema marks protected fields with the `@auth` directive.

**Public (no auth):**

* `ratings(limit, start)` — Content ratings (e.g. MPAA, TV).
* `genres(limit, start)` — Content genres.

All other operations require a valid Bearer token.

## Response shape

Responses follow the [GraphQL spec](https://spec.graphql.org/draft/#sec-Response): `{ data?, errors? }`.

* **Success** — `data` is present; its key matches the operation name (e.g. `data.me`, `data.channel`, `data.createContent`).
* **Error** — `errors` is an array of `{ message, path?, extensions? }`. HTTP status may still be 200; always check `response.errors`.

See [Response format and errors](/docs/rad-tv-developer-api/response-format-and-errors/) for details.

## Introspection

The schema supports introspection. You can run introspection queries against `POST /graphql` to discover the full schema (types, fields, arguments). Use this or a GraphQL client (e.g. Altair at `/altair` in development) to explore the API.

## Main concepts

* **DIDs** — Use DIDs as IDs for channels and content (e.g. `did:rad.live:channel/<uuid>`, `did:rad.live:content/feature/<id>`).
* **Channel catalog** — Channels expose catalog via `features`, `series`, `episodes`, `streams`, etc. There is no legacy `content` field; use `channel.features(limit, start)` and similar.
* **Nullability** — Fields with `!` in the schema are non-null. Single-entity queries (`channel(id)`, `feature(id)`, etc.) return `null` when the entity is not found or not accessible.
