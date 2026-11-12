---
title: Decentralized Identifiers
---

## DID (Decentralized Identifier)

DIDs are the **canonical public ID** for channels and content. Always use them in API requests and when storing references in your app.

**Format:** `did:rad.live:<type>/<id>`

**Examples:**

| Entity            | Example DID                          |
| ----------------- | ------------------------------------ |
| Channel           | `did:rad.live:channel/<uuid>`        |
| Content (feature) | `did:rad.live:content/feature/<id>`  |
| Playlist          | `did:rad.live:content/playlist/<id>` |

**Where DIDs appear:**

* GraphQL: `channel(id: DID!)`, `feature(id: DID!)`, mutation arguments like `createContentAsset(id: DID!, ...)`, and `id` fields on types
* MCP: Tool arguments such as `contentId`, `channel`, `id` (e.g. `create_content_asset`, `follow_channel`, `publish_content`)
* Responses: `Content.id`, `Channel.id`, `Playlist.id`, etc.
