# MCP

The Rad TV API exposes a **Model Context Protocol (MCP)** server so IDEs and coding agents (e.g. Cursor, Claude) can interact with the API using tools with typed inputs.

## Endpoint

* **URL:** `POST /mcp` (and `GET /mcp`, `DELETE /mcp` for Streamable HTTP)
* **Auth:** Required. Send `Authorization: Bearer <api-key>`. Use an API key from `POST /internal/v0/generate-api-key` (see [API keys](../api-keys.md)).
* Production: `https://api.rad.live/mcp`.

{% hint style="info" %}
Protocol version header: `MCP-Protocol-Version: 2025-11-25`.
{% endhint %}

## What MCP provides

* **23 tools** — Map to core API actions: identity, channels, categories, ratings, genres, content, playlists, ingestion, engagement, YouTube. Each tool has a description and an input schema.
* **1 resource** — `rad://api/capabilities` returns JSON with `name`, `version`, `tools` (list of names), `llms_txt`, `graphql`, and `description`.
* **2 prompts** — `create_content_and_upload` (guide for content + TUS upload), `follow_a_channel` (guide to follow by DID).

## Protocol

{% stepper %}
{% step %}
### Initialize

Send an `initialize` JSON-RPC request first (required).
{% endstep %}

{% step %}
### List tools

Use `tools/list` to get all tools and their schemas.
{% endstep %}

{% step %}
### Call tools

Use `tools/call` with `name` and `arguments`.
{% endstep %}

{% step %}
### Resources

Read `rad://api/capabilities` for a summary of capabilities.
{% endstep %}
{% endstepper %}

## When to use MCP vs GraphQL

| Use MCP when                                     | Use GraphQL when                                    |
| ------------------------------------------------ | --------------------------------------------------- |
| Building IDE/agent integrations (Cursor, Claude) | Building web or mobile apps                         |
| You want one action = one tool call              | You need full schema, introspection, custom queries |
| You prefer typed tool arguments                  | You prefer a single endpoint and flexible queries   |
