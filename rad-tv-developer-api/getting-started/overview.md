# Overview

The Rad TV API is the public backend for the [Rad](https://rad.live) platform. It is consumed by web and mobile clients and by coding agents (e.g. Cursor, Claude) via GraphQL and the Model Context Protocol (MCP).

## Features

- **GraphQL API** — Mercurius on Fastify; full schema, introspection, and typed operations
- **Identity** — DID, LRN, JWT, and UCAN support for canonical IDs and auth
- **Content engagement** — Like/unlike, comments, channel follow/unfollow via 12core UserClient
- **Channels and catalog** — `channel(id)`, `channels(limit, start)`, and catalog types: features, series, episodes, streams, seasons, miniseries
- **Content categories** — `categories(limit, start)` (auth required); content and channel metadata include `categories: [Category]`
- **Ratings and genres** — `ratings(limit, start)` and `genres(limit, start)` (public; no auth) for filtering/UI
- **Resumable uploads** — TUS protocol for file ingestion
- **Video transcoding** — Job submission and status tracking
- **12core integration** — Media processing, storage, and catalog (content-metadata)
- **Environment-based configuration** — Development, staging, production
- **Authentication** — Bearer tokens with `@auth` directive on protected operations
- **YouTube** — OAuth, bidirectional sync (import/publish), background job tracking
- **Agent and LLM access** — llms.txt manifest at `GET /llms.txt` and `GET /.well-known/llms.txt`; MCP server at `/mcp` (Bearer auth)

## Prerequisites

- **Node.js** — ES2022+ required
- **DynamoDB** — Local instance for development; AWS for staging/production
- **AWS credentials** — For staging/production DynamoDB

## Next steps

- [Quickstart](quickstart.md) — Run the API locally and open the GraphQL playground
- [Base URL and endpoints](base-url-and-endpoints.md) — All entry points and URLs
- [Authentication](authentication/overview.md) — How to authenticate requests
