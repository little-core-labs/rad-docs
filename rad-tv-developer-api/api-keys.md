# API Keys

API keys are used for programmatic access and for the MCP server (e.g. from Cursor or Claude). They are generated from a user's JWT.

## Using API keys

Send it as the Bearer token:

```
Authorization: Bearer <api-key>
```

Use the same key for:

* `POST /graphql` — All authenticated queries and mutations
* `POST /mcp` — MCP initialize, tools/list, tools/call
* `POST /ingestion/:id` — File upload for an ingestion session

## Security

{% hint style="danger" %}
* Do not commit API keys to source control or expose them in client-side code.
* Prefer API keys over JWTs for long-lived or automated access.
* Rotate keys if they may have been compromised; generate a new key and stop using the old one.
{% endhint %}
