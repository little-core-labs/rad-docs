# Introduction

The Rad TV API uses a multi-layered authentication system. Almost all operations require a valid Bearer token.

## Summary

| Mechanism   | Use case                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------ |
| **JWT**     | User sessions (e.g. from Rad web/mobile login).                                            |
| **API key** | Programmatic and MCP access; generated from a JWT                                          |
| **DID**     | Canonical public identifier for channels and content (e.g. `did:rad.live:channel/<uuid>`). |

## Bearer token

Send the token on every request:

```
Authorization: Bearer <jwt-or-api-key>
```

* **GraphQL** — Include this header on `POST /graphql`. Queries and mutations marked with `@auth` require it.
* **MCP** — Required for `POST /mcp` (initialize, list tools, call tools).
* **Ingestion** — `POST /ingestion/:id` requires an API key (Bearer).

Without a valid Bearer token, protected operations return 401.

## Public operations (no auth)

Only these do **not** require authentication:

* `ratings(limit, start)` — Content ratings (e.g. MPAA, TV).
* `genres(limit, start)` — Content genres.

All other GraphQL operations and MCP tool calls require Bearer auth.
