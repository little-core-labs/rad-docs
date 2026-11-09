---
title: Rad TV Developer API
---

The public API for the [Rad](https://rad.live/) platform provides a **GraphQL API** and an **MCP (Model Context Protocol) server** for building apps and integrating with coding agents (e.g. Cursor, Claude).

## What the API offers

* **Identity** — Users, channels, and authentication (JWT and API keys)
* **Content** — Create, update, and manage media content; resumable uploads (TUS); transcoding
* **Channels and catalog** — Features, series, episodes, streams, playlists; categories, ratings, genres
* **Engagement** — Likes, comments, channel follow/unfollow
* **YouTube** — OAuth connection, import videos from YouTube, publish Rad content to YouTube

## Two ways to integrate

| Interface   | Endpoint                      | Best for                                                                 |
| ----------- | ----------------------------- | ------------------------------------------------------------------------ |
| **GraphQL** | `POST /graphql`               | Web and mobile apps; full schema, introspection, and all operations      |
| **MCP**     | `POST /mcp` (Streamable HTTP) | IDEs and agent runtimes; tools map directly to actions with typed inputs |

Both require **Bearer authentication** (JWT or API key). Only the `ratings` and `genres` queries are public (no auth).

## Agent and LLM access

* **llms.txt** — Human- and machine-readable manifest at `GET /llms.txt` (and `GET /.well-known/llms.txt`). Describes auth, MCP tools, and GraphQL.
* **MCP** — Recommended for agents: 23 tools, 1 resource (`rad://api/capabilities`), and 2 prompts. Full tool list and arguments: see [MCP Tools reference](mcp/tools-reference.md) or `GET /llms.txt`.
