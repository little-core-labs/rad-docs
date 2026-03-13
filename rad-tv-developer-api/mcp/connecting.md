# Connecting to MCP

Use Streamable HTTP: send JSON-RPC requests to `POST /mcp` with Bearer auth. Replace `YOUR_API_KEY` with a key from `POST /internal/v0/generate-api-key`.

## Initialize (required first)

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "MCP-Protocol-Version: 2025-11-25" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"curl","version":"1.0"}}}'
```

## List tools

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "MCP-Protocol-Version: 2025-11-25" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/list"}'
```

## Call a tool (e.g. get_me)

```bash
curl -X POST http://localhost:3000/mcp \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "MCP-Protocol-Version: 2025-11-25" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get_me","arguments":{}}}'
```

## Production

Use the production base URL and your real API key:

```
https://api.rad.live/mcp
```

## IDE integration

IDEs that support MCP (e.g. Cursor) can connect to the Rad TV MCP server by configuring the endpoint and providing the API key. Refer to your IDE’s MCP documentation for how to add a server and set the Bearer token.
