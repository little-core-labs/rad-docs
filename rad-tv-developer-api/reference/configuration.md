# Configuration

The API uses environment-based configuration. This page summarizes the main options for deployers. The full schema is in `config/schema.json` in the repository.

## Environment

Set `NODE_ENV` to control the environment:

- **development** (default) — Uses local DynamoDB
- **staging** — AWS DynamoDB with staging config
- **production** — AWS DynamoDB with production config

Each environment has its own directory under `config/` with `config.json` and optional `bootstrap.ts`.

## Accessing configuration

Configuration is loaded at startup and accessed with dot notation:

```javascript
config.get('server.port')
config.get('server.publicUrl')
config.get('database.dynamodb.endpoint')
```

## Common configuration keys

| Key | Description |
|-----|-------------|
| `server.port` | HTTP server port (e.g. 3000) |
| `server.logger` | Enable request logging (boolean) |
| `server.publicUrl` | Public base URL for links in llms.txt (e.g. `https://api.rad.live`) |
| `database.dynamodb.region` | AWS region for DynamoDB |
| `database.dynamodb.endpoint` | DynamoDB endpoint (e.g. local: `http://localhost:8888`) |
| `database.dynamodb.local.port` | Port for local DynamoDB when used |
| `database.dynamodb.local.path` | Path for local DynamoDB (if applicable) |
| `identity.issuer.jwk` | Base64-encoded JWK for UCAN issuer |
| `ingestion.endpoint` | TUS upload endpoint (e.g. `https://tus-staging.12core.net/upload/`) |
| `12core.key` | Optional API key for 12core services |
| `mcp.enabled` | Enable MCP server at `/mcp` (default true) |
| `youtube.clientId` | Google OAuth client ID |
| `youtube.clientSecret` | Google OAuth client secret |
| `youtube.redirectUri` | OAuth redirect URI for YouTube |

## Example config.json (development)

```json
{
  "server": {
    "port": 3000,
    "logger": true,
    "publicUrl": "http://localhost:3000"
  },
  "database": {
    "dynamodb": {
      "region": "us-east-2",
      "endpoint": "http://localhost:8888"
    }
  },
  "identity": {
    "issuer": {
      "jwk": "<base64-encoded-key>"
    }
  },
  "ingestion": {
    "endpoint": "https://tus-staging.12core.net/upload/"
  },
  "12core": {
    "key": "<optional-api-key>"
  }
}
```

## Generating issuer key

To generate a new UCAN issuer key pair (for `identity.issuer.jwk`):

```bash
node dist/scripts/generate-issuer-keypair.js
```

Add the output to your environment’s `config.json` under `identity.issuer.jwk`.
