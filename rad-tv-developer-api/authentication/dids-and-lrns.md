# DIDs and LRNs

The API uses two kinds of identifiers: **DIDs** (public) and **LRNs** (internal). Use DIDs in all client-facing flows.

## DID (Decentralized Identifier)

DIDs are the **canonical public ID** for channels and content. Always use them in API requests and when storing references in your app.

**Format:** `did:rad.live:<type>/<id>`

**Examples:**

| Entity | Example DID |
|--------|-------------|
| Channel | `did:rad.live:channel/<uuid>` |
| Content (feature) | `did:rad.live:content/feature/<id>` |
| Playlist | `did:rad.live:content/playlist/<id>` |

**Where DIDs appear:**

- GraphQL: `channel(id: DID!)`, `feature(id: DID!)`, mutation arguments like `createContentAsset(id: DID!, ...)`, and `id` fields on types
- MCP: Tool arguments such as `contentId`, `channel`, `id` (e.g. `create_content_asset`, `follow_channel`, `publish_content`)
- Responses: `Content.id`, `Channel.id`, `Playlist.id`, etc.

Do not mix raw content-metadata or 12core IDs with DIDs; the API maps between them internally.

## LRN (Littlstar Resource Name)

LRNs are **internal resource names** used by 12core (media/catalog backend). The API often returns both `id` (DID) and `lrn` where relevant.

**Format:** `lrn:12core:media:content:channel:<id>` (and similar for other resource types)

**When to use LRN:**

- You generally do **not** need to use LRNs in client code. Prefer DIDs for all public operations.
- Some mutations support LRN-based targets (e.g. `like(targetLrn)`, `follow(targetLrn)`). For consistency, prefer the DID-based mutations (`likeContent(id)`, `followChannel(channel)`) when you have a DID.

Resolvers map DIDs to/from 12core LRNs via internal helpers (`contentDidToLrn` / `contentLrnToDid`). Client flows should rely on DIDs.

## Summary

| Identifier | Use in |
|------------|--------|
| **DID** | All client requests and storage; GraphQL arguments and `id` fields; MCP tool arguments |
| **LRN** | Returned in responses for reference; optional in a few LRN-based mutations; do not use as primary client identifier |
