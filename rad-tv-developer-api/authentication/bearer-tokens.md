# Bearer tokens

All protected Rad TV API requests use the same header:

```
Authorization: Bearer <token>
```

The token can be a **JWT** (user session) or an **API key** (programmatic/MCP).

## Where to send it

| Endpoint | Header |
|----------|--------|
| `POST /graphql` | `Authorization: Bearer <token>` |
| `POST /mcp`, `GET /mcp`, `DELETE /mcp` | `Authorization: Bearer <token>` |
| `POST /internal/v0/generate-api-key` | `Authorization: Bearer <jwt>` (JWT required here) |
| `POST /ingestion/:id` | `Authorization: Bearer <api-key>` |

## JWT tokens

JWTs are issued by the platform when a user logs in (e.g. via Rad web or mobile). Use them for:

- GraphQL requests as the logged-in user
- Calling `POST /internal/v0/generate-api-key` to create an API key

Do not use JWTs for long-lived scripts or MCP from IDEs; use an API key instead.

## API keys

API keys are long-lived tokens generated from a JWT. Use them for:

- MCP access (Cursor, Claude, etc.)
- Scripts and automated clients
- `POST /ingestion/:id` uploads

Generate an API key via `POST /internal/v0/generate-api-key` with a valid JWT. See [API keys](api-keys.md).

## Invalid or missing token

If the token is missing or invalid:

- **GraphQL** — Queries/mutations with `@auth` return an error (e.g. 401 or error in `errors`).
- **MCP** — Initialize and tool calls return an error (e.g. "Authentication required. Send Authorization: Bearer <api-key>.").

Only `ratings` and `genres` GraphQL queries work without a token.
