# Internal routes

These endpoints are used for health checks, API key generation, and file ingestion. They are part of the public API surface for integrators.

## Health check

```
GET /internal/v0/healthcheck
```

Returns **200 OK** with no required headers. Use for load balancers and monitoring. No authentication.

## Generate API key

```
POST /internal/v0/generate-api-key
```

Generates an API key for the authenticated user.

**Headers:**

- `Authorization: Bearer <jwt-token>` — **Required.** The JWT must identify the user who will own the key.
- `x-12core-key` — Required in **staging and production** (optional in development). Used to authorize the request.

**Response (success):**

```json
{
  "data": {
    "lrn": "lrn:12core:user:<id>",
    "key": "<api-key-string>"
  }
}
```

Store the `key`; it is not shown again. Use it as the Bearer token for GraphQL, MCP, and ingestion. See [API keys](../authentication/api-keys.md).

## File ingestion (upload)

```
POST /ingestion/:id
```

Upload a file for an **existing** ingestion session. The session is created by `createContentAsset` or `createPlaylistAsset` (GraphQL) or the MCP tools `create_content_asset` / `create_playlist_asset`, which return an `endpoint` (e.g. `https://api.rad.live/ingestion/<id>`).

**Headers:**

- `Authorization: Bearer <api-key>` — **Required.** Use the API key (or JWT) that owns the session.
- `Content-Type: multipart/form-data` — Required for the file upload.

**URL:** Replace `:id` with the ingestion session ID from the create-asset response (often part of the endpoint path).

Resumable uploads may use the TUS protocol; the exact endpoint and behavior can depend on configuration (e.g. redirect to a TUS server). Follow the session instructions returned when creating the asset.
