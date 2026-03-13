# Response format and errors

The API uses a consistent envelope so clients can rely on `data` for success and `errors` for failure.

## GraphQL (`POST /graphql`)

Every response follows the [GraphQL spec](https://spec.graphql.org/draft/#sec-Response): `{ data?, errors? }`.

### Success

- **data** is present. The key matches the operation name (e.g. `data.me`, `data.channel`, `data.createContent`).
- Use `response.data` for the result.

Example:

```json
{
  "data": {
    "me": {
      "id": "did:rad.live:user:...",
      "username": "alice"
    }
  }
}
```

### Error

- **errors** is an array of objects: `{ message: string, path?: string[], extensions?: object }`.
- HTTP status may still be 200; always check `response.errors` when present.
- Use `response.errors` for user-facing or logged error messages.

Example:

```json
{
  "errors": [
    {
      "message": "Authentication required.",
      "path": ["me"]
    }
  ]
}
```

Partial data: GraphQL can return both `data` and `errors` when some fields resolve and others fail. Inspect both.

## REST and internal HTTP JSON

For non-GraphQL JSON endpoints (e.g. generate-api-key, youtube disconnect):

### Success (2xx)

- Body shape: `{ data: <payload> }`. The payload is the response body.
- Example (generate-api-key): `{ "data": { "lrn": "lrn:12core:user:...", "key": "..." } }`
- Example (disconnect): `{ "data": { "ok": true } }`

### Error (4xx / 5xx)

- Body shape: `{ "errors": [ { "message": string, "code"?: string } ] }`.
- HTTP status indicates the error type; the body provides a consistent shape for parsing.
