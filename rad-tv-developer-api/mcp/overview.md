# MCP overview

The Rad TV API exposes a **Model Context Protocol (MCP)** server so IDEs and coding agents (e.g. Cursor, Claude) can interact with the API using tools with typed inputs.

## Endpoint

- **URL:** `POST /mcp` (and `GET /mcp`, `DELETE /mcp` for Streamable HTTP)
- **Auth:** Required. Send `Authorization: Bearer <api-key>`. Use an API key from `POST /internal/v0/generate-api-key` (see [API keys](../authentication/api-keys.md)).

Production: `https://api.rad.live/mcp`.

## What MCP provides

- **23 tools** — Map to core API actions: identity, channels, categories, ratings, genres, content, playlists, ingestion, engagement, YouTube. Each tool has a description and an input schema.
- **1 resource** — `rad://api/capabilities` returns JSON with `name`, `version`, `tools` (list of names), `llms_txt`, `graphql`, and `description`.
- **2 prompts** — `create_content_and_upload` (guide for content + TUS upload), `follow_a_channel` (guide to follow by DID).

## Protocol

The server uses **Streamable HTTP** (MCP over HTTP). Protocol version: `MCP-Protocol-Version: 2025-11-25`.

1. **Initialize** — Send an `initialize` JSON-RPC request first (required).
2. **List tools** — Use `tools/list` to get all tools and their schemas.
3. **Call tools** — Use `tools/call` with `name` and `arguments`.
4. **Resources** — Read `rad://api/capabilities` for a summary of capabilities.

## When to use MCP vs GraphQL

| Use MCP when | Use GraphQL when |
|--------------|------------------|
| Building IDE/agent integrations (Cursor, Claude) | Building web or mobile apps |
| You want one action = one tool call | You need full schema, introspection, custom queries |
| You prefer typed tool arguments | You prefer a single endpoint and flexible queries |

Full tool list and arguments: see [Tools reference](tools-reference.md) or `GET /llms.txt` (and `GET /.well-known/llms.txt`).

## Next steps

- [Connecting](connecting.md) — Initialize, list tools, and call a tool with curl
- [Tools reference](tools-reference.md) — All MCP tools and arguments
- [Resources and prompts](resources-and-prompts.md) — Capabilities resource and prompt templates
