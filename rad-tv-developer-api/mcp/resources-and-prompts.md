# Resources and Prompts

<a id="resource-rad-api-capabilities"></a>

## Resource: rad://api/capabilities

The MCP server exposes one resource: **`rad://api/capabilities`**.

Contents (JSON):

* `name` — Server name (e.g. `radtv-api`)
* `version` — Server version (e.g. `2025-06-18`)
* `tools` — Array of tool names (all 23 tools)
* `llms_txt` — Path to the llms.txt manifest (e.g. `/llms.txt`)
* `graphql` — Path to the GraphQL endpoint (e.g. `/graphql`)
* `description` — Short description of the API

Use this resource to discover what the server supports without calling `tools/list`. MIME type: `application/json`.

***

## Prompts

Prompts are predefined message templates that guide the agent through a workflow.

### create\_content\_and\_upload

Description: Guide to create content, create content asset, then upload file via TUS.

Summary:

<a id="create-content"></a>

### Step 1: Create content

Call `create_content` with title/summary/type.

<a id="create-content-asset"></a>

### Step 2: Create content asset

Call `create_content_asset` with the returned content id, filename, and size.

<a id="upload-file"></a>

### Step 3: Upload file

POST the file to the returned endpoint with the header `Authorization: Bearer <api-key>` and `Content-Type: multipart/form-data`.

***

### follow\_a\_channel

Description: Guide to follow a channel by DID.

Summary:

Use the `follow_channel` tool with the channel DID (e.g. `did:rad.live:channel/<uuid>`). Get channel DIDs from `list_followed_channels` or from the API.

***

<a id="llms.txt"></a>

## llms.txt

The full manifest for LLMs and agents is available at:

* `GET /llms.txt`
* `GET /.well-known/llms.txt` (redirects to `/llms.txt`)

It includes authentication instructions, the MCP tool list with arguments, GraphQL summary, and links to the GraphQL and MCP endpoints. Use it when your client supports llms.txt discovery.
