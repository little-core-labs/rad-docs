# Resources and prompts

## Resource: rad://api/capabilities

The MCP server exposes one resource: **`rad://api/capabilities`**.

**Contents (JSON):**

- `name` — Server name (e.g. `radtv-api`)
- `version` — Server version (e.g. `2025-06-18`)
- `tools` — Array of tool names (all 23 tools)
- `llms_txt` — Path to the llms.txt manifest (e.g. `/llms.txt`)
- `graphql` — Path to the GraphQL endpoint (e.g. `/graphql`)
- `description` — Short description of the API

Use this resource to discover what the server supports without calling `tools/list`. MIME type: `application/json`.

## Prompts

Prompts are predefined message templates that guide the agent through a workflow.

### create_content_and_upload

**Description:** Guide to create content, create content asset, then upload file via TUS.

**Message content (summary):**  
Steps: (1) Call `create_content` with title/summary/type. (2) Call `create_content_asset` with the returned content id, filename, and size. (3) POST the file to the returned endpoint with `Authorization: Bearer <api-key>` and `Content-Type: multipart/form-data`.

### follow_a_channel

**Description:** Guide to follow a channel by DID.

**Message content (summary):**  
Use the `follow_channel` tool with the channel DID (e.g. `did:rad.live:channel/<uuid>`). Get channel DIDs from `list_followed_channels` or from the API.

## llms.txt

The full manifest for LLMs and agents is available at:

- `GET /llms.txt`
- `GET /.well-known/llms.txt` (redirects to `/llms.txt`)

It includes authentication instructions, the MCP tool list with arguments, GraphQL summary, and links to the GraphQL and MCP endpoints. Use it when your client supports llms.txt discovery.
