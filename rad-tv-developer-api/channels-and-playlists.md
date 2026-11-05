# Channels and Playlists

Channels are creator spaces that hold catalog content (features, series, episodes, streams) and playlists. This guide covers how the API exposes them.

## Channels

### Getting a channel

* **Single channel:** `channel(id: DID!)` — Returns the channel or `null` if not found or not accessible.
* **List channels:** `channels(limit, start)` — Paginated list of all channels (auth required).

**MCP:** `get_channel` (with `id`), `list_channels` (with optional `limit`, `start`).

### Channel fields

A channel has:

* **id** (DID), **metadata** (name, summary, shortSummary, keywords, categories)
* **assets** — Images (and empty videos) for the channel
* **playlists(limit, start)** — Playlists belonging to the channel
* **followersCount**, **isFollowed** — Follower count and whether the current user follows
* **Catalog** — Use these fields to list content; there is **no** legacy `content` field:
  * **features(limit, start)** — Feature-length content
  * **series(limit, start)** — TV series
  * **miniseries(limit, start)** — Miniseries
  * **seasons(limit, start)** — Seasons
  * **episodes(limit, start)** — Episodes
  * **streams(limit, start)** — Streams

Always use `channel.features(...)`, `channel.series(...)`, etc., not a single `content` field.

### Example: channel with catalog and likes

```graphql
query {
  channel(id: "did:rad.live:channel/<uuid>") {
    id
    metadata { name summary }
    followersCount
    isFollowed
    features(limit: 10, start: 0) {
      id
      metadata { title }
      likes { count isLiked }
    }
  }
}
```

## Playlists

### Creating and updating playlists

* **Create:** `createPlaylist(channel: DID, input: PlaylistInput)` — Optionally pass a channel DID.
* **Update:** `updatePlaylist(id: DID!, input: PlaylistInput)` — Update metadata (title, summary).

**MCP:** `create_playlist` (title, summary, optional channel), `update_playlist` (id, title, summary).

### Playlist image upload

### Step 1

Call `createPlaylistAsset(id, input)` (GraphQL) or `create_playlist_asset` (MCP) with playlist DID, filename, and optional size.

### Step 2

POST the image to the returned `endpoint` with Bearer auth and multipart/form-data.

### Playlist fields

* **id** (DID), **metadata** (title, summary, etc.), **assets**
* **items(limit, start)** — Playlist items (each has content reference and index)

## Categories

Content and channel metadata can include **categories** for filtering. Query all categories with:

* **GraphQL:** `categories(limit, start)` (auth required)
* **MCP:** `list_categories` (optional `limit`, `start`)

Categories have `id` (DID), and metadata (name, summary, shortSummary). Use them in filters and UI.

## Follow / unfollow

* **GraphQL:** `followChannel(channel: DID!)`, `unfollowChannel(channel: DID!)`
* **MCP:** `follow_channel`, `unfollow_channel` with `channel` (DID)

The current user’s followed channels: `me.followedChannels` (GraphQL) or `list_followed_channels` (MCP).
