# Managing Playlists

Check out our custom Rad TV Developer API [chatbot here](https://chatgpt.com/g/g-6745f735b3b481918d77da7ee69af103-rad-tv-developer-api-expert). (free or premium OpenAI account required)

## Working with Playlists

The Rad TV Developer API allows you to create, update, and manage playlists within a channel. Playlists serve as collections of content that can be organized and displayed to users.

### Creating a Playlist

To create a playlist, use the `createPlaylist` mutation. This requires a `channel` identifier and a `PlaylistInput` object for the playlist metadata.

#### GraphQL Mutation Example:

```graphql
mutation {
  createPlaylist(
    channel: "did:rad:channel/5678-wxyz",
    input: {
      metadata: {
        title: "Adventure Playlist",
        summary: "A collection of exciting adventure videos"
      }
    }
  ) {
    id
    metadata {
      title
      summary
    }
  }
}
```

Expected Response:

```json
{
  "data": {
    "createPlaylist": {
      "id": "did:rad:playlist/abcd-5678",
      "metadata": {
        "title": "Adventure Playlist",
        "summary": "A collection of exciting adventure videos"
      }
    }
  }
}
```

### Updating a Playlist

To update an existing playlist, use the `updatePlaylist` mutation. Provide the playlist ID and any fields you want to update.

#### GraphQL Mutation Example:

```graphql
mutation {
  updatePlaylist(
    id: "did:rad:playlist/abcd-5678",
    input: {
      metadata: {
        title: "Updated Adventure Playlist",
        summary: "Updated summary for the adventure videos collection"
      }
    }
  ) {
    id
    metadata {
      title
      summary
    }
  }
}
```

Expected Response:

```json
{
  "data": {
    "updatePlaylist": {
      "id": "did:rad:playlist/abcd-5678",
      "metadata": {
        "title": "Updated Adventure Playlist",
        "summary": "Updated summary for the adventure videos collection"
      }
    }
  }
}
```

### Adding Assets to a Playlist

To attach images or other assets to a playlist, use the `createPlaylistAsset` mutation.

#### GraphQL Mutation Example:

```graphql
mutation {
  createPlaylistAsset(
    id: "did:rad:playlist/abcd-5678",
    input: {
      filename: "adventure-thumbnail.png",
      image: {
        hint: BANNER
      }
    }
  ) {
    id
    metadata {
      title
    }
  }
}
```

Expected Response:

```json
{
  "data": {
    "createPlaylistAsset": {
      "id": "did:rad:playlist/abcd-5678",
      "metadata": {
        "title": "Adventure Playlist"
      }
    }
  }
}
```

### Best Practices

* **Organize Playlists**: Use meaningful titles and summaries for easy management.
* **Optimize Metadata**: Include relevant keywords and descriptions for better discoverability.
* **Error Handling**: Handle cases like invalid playlist IDs or permission errors gracefully.
