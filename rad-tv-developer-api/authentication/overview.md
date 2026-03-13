# Authentication overview

The Rad TV API uses a multi-layered authentication system. Almost all operations require a valid Bearer token.

## Summary

| Mechanism | Use case |
|-----------|----------|
| **JWT** | User sessions (e.g. from Rad web/mobile login). |
| **API key** | Programmatic and MCP access; generated from a JWT via `POST /internal/v0/generate-api-key`. |
| **DID** | Canonical public identifier for channels and content (e.g. `did:rad.live:channel/<uuid>`). |
| **LRN** | Internal resource name (12core); API often returns both `id` (DID) and `lrn` where relevant. |
| **UCAN** | User Controlled Authorization Networks for delegation (issuer key in config). |

## Bearer token

Send the token on every request:

```
Authorization: Bearer <jwt-or-api-key>
```

- **GraphQL** — Include this header on `POST /graphql`. Queries and mutations marked with `@auth` require it.
- **MCP** — Required for `POST /mcp` (initialize, list tools, call tools).
- **Internal routes** — `POST /internal/v0/generate-api-key` requires a JWT.
- **Ingestion** — `POST /ingestion/:id` requires an API key (Bearer).

Without a valid Bearer token, protected operations return 401.

## Public operations (no auth)

Only these do **not** require authentication:

- `ratings(limit, start)` — Content ratings (e.g. MPAA, TV).
- `genres(limit, start)` — Content genres.

All other GraphQL operations and MCP tool calls require Bearer auth.

## Authentication flow (high level)

1. Client includes JWT in `Authorization: Bearer <token>`.
2. Mercurius-auth validates the token and extracts user identity.
3. Server looks up user and JWS in the identity table.
4. Authenticated context is passed to GraphQL resolvers (and MCP tool handlers).

## Next steps

- [Bearer tokens](bearer-tokens.md) — How to send and use JWTs.
- [API keys](api-keys.md) — Generating and using API keys for MCP and scripts.
- [DIDs and LRNs](dids-and-lrns.md) — Identifiers used in the API.
