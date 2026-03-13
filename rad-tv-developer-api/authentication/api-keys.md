# API keys

API keys are used for programmatic access and for the MCP server (e.g. from Cursor or Claude). They are generated from a user's JWT.

## Generate an API key

**Endpoint:** `POST /internal/v0/generate-api-key`

**Headers:**

- `Authorization: Bearer <jwt-token>` — Required. The JWT must identify the user who will own the key.
- `x-12core-key` — Required in staging and production (optional in development).

**Response (success):**

```json
{
  "data": {
    "lrn": "lrn:12core:user:<id>",
    "key": "<api-key-string>"
  }
}
```

Store the `key` value; it is not shown again. Use it as the Bearer token for GraphQL, MCP, and ingestion.

## Using the API key

Send it as the Bearer token:

```
Authorization: Bearer <api-key>
```

Use the same key for:

- `POST /graphql` — All authenticated queries and mutations
- `POST /mcp` — MCP initialize, tools/list, tools/call
- `POST /ingestion/:id` — File upload for an ingestion session

## Script: generate API key from LRN

For server-side or admin use, you can create an API key for a user by LRN using the built-in script (after building the project):

```bash
node dist/scripts/generate-apikey.js lrn:12core:user:<user-id>
```

This outputs a key that can be used as the Bearer token. Ensure the script is only run in a secure environment with access to the identity store.

## Security

- Do not commit API keys to source control or expose them in client-side code.
- Prefer API keys over JWTs for long-lived or automated access.
- Rotate keys if they may have been compromised; generate a new key and stop using the old one.
