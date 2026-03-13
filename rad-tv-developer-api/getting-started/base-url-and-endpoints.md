# Base URL and endpoints

## Base URL

| Environment | Base URL |
|-------------|----------|
| **Production** | `https://api.rad.live` |
| **Local development** | `http://localhost:3000` |

Set `server.publicUrl` in configuration (e.g. `https://api.rad.live`) so links in the llms.txt manifest point to the correct host.

## Main endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/graphql` | POST | GraphQL API. Send queries and mutations with `Authorization: Bearer <token>`. |
| `/mcp` | GET, POST, DELETE | MCP server (Streamable HTTP). Bearer auth required. Initialize with POST, then list/call tools. |
| `/llms.txt` | GET | LLM and agent manifest (auth, MCP tools, GraphQL summary). |
| `/.well-known/llms.txt` | GET | Redirects to `/llms.txt`. |
| `/altair` | GET | GraphQL playground (typically enabled in non-production). |

## Internal and ingestion endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/internal/v0/healthcheck` | GET | Health check; returns 200 OK. |
| `/internal/v0/generate-api-key` | POST | Generate API key. Requires `Authorization: Bearer <jwt>` (and in staging/production, `x-12core-key`). |
| `/ingestion/:id` | POST | Upload file for an existing ingestion session. `Authorization: Bearer <api-key>`, `Content-Type: multipart/form-data`. |

## YouTube OAuth (browser)

| Endpoint | Description |
|----------|-------------|
| `GET /youtube/connect` | Initiates Google OAuth flow (redirects to Google). |
| `GET /youtube/callback` | Receives OAuth code from Google. |
| `POST /youtube/disconnect` | Revokes token and removes YouTube connection. |

## Using the base URL in requests

- **GraphQL:** `POST {baseUrl}/graphql` with JSON body and `Authorization: Bearer <token>`.
- **MCP:** Use `{baseUrl}/mcp` for Streamable HTTP (e.g. `https://api.rad.live/mcp` in production).
- **llms.txt:** Open `{baseUrl}/llms.txt` in a browser or fetch it to get the manifest.
