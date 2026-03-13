# Quickstart

Get the Rad TV API running locally and send your first request.

## Install and build

```bash
npm install
npm run build
```

This compiles TypeScript to `dist/`. You must run `npm run build` before `npm start`.

## Run the server

**Development (recommended for local docs):**

```bash
npm run dev
```

This uses `tsx` to run the server, starts a local DynamoDB instance in development, then starts the server. Default port: **3000**.

**Production-style:**

```bash
npm start
```

Uses the compiled output in `dist/` and does not start local DynamoDB (expects DynamoDB to be available via config).

## GraphQL playground

In development, open the Altair GraphQL client at:

```
http://localhost:3000/altair
```

Use it to run queries and mutations. Most operations require `Authorization: Bearer <token>` (see [Authentication](authentication/overview.md)).

## Generate an API key

For MCP or programmatic access, generate an API key after authenticating with a JWT:

```
POST /internal/v0/generate-api-key
Authorization: Bearer <jwt-token>
```

In staging/production you may also need the `x-12core-key` header. See [API keys](authentication/api-keys.md) and [Internal routes](reference/internal-routes.md).

## Run local DynamoDB only

To run only the local DynamoDB instance (e.g. in another terminal):

```bash
npm run database:local
```

## Next steps

- [Base URL and endpoints](base-url-and-endpoints.md) — All API entry points
- [Authentication](authentication/overview.md) — Bearer tokens and API keys
- [GraphQL examples](graphql/examples.md) — Example queries and mutations
