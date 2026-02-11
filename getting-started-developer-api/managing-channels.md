# Managing Channels

Check out our custom Rad TV Developer API [chatbot here](https://chatgpt.com/g/g-6745f735b3b481918d77da7ee69af103-rad-tv-developer-api-expert). (free or premium OpenAI account required)

## Working with Channels

Channels in the Rad TV Developer API serve as containers for organizing content and playlists. You can manage channels by retrieving channel data and customizing channel metadata.

### Retrieving Channel Information

To fetch a channel's details, use the `me` query to access the authenticated user's channel.

#### GraphQL Query Example:

```graphql
query {
  me {
    channel {
      id
      metadata {
        name
        summary
        keywords
      }
      playlists {
        id
        metadata {
          title
          summary
        }
      }
    }
  }
}
```

Expected Response:

```json
{
  "data": {
    "me": {
      "channel": {
        "id": "did:rad:channel/5678-wxyz",
        "metadata": {
          "name": "John's Channel",
          "summary": "A collection of curated content by John",
          "keywords": ["personal", "curated", "media"]
        },
        "playlists": [
          {
            "id": "did:rad:playlist/abcd-1234",
            "metadata": {
              "title": "Adventure Playlist",
              "summary": "Exciting adventure videos"
            }
          }
        ]
      }
    }
  }
}
```

### Updating Channel Metadata

To update a channel's metadata, use the `updateChannelMetadata` mutation. This operation requires the channel ID and the updated metadata fields.

#### GraphQL Mutation Example:

```graphql
mutation {
  updateChannelMetadata(
    id: "did:rad:channel/5678-wxyz",
    input: {
      name: "John's Updated Channel",
      summary: "Updated collection of curated content",
      keywords: ["updated", "media", "collection"]
    }
  ) {
    id
    metadata {
      name
      summary
      keywords
    }
  }
}
```

Expected Response:

```json
{
  "data": {
    "updateChannelMetadata": {
      "id": "did:rad:channel/5678-wxyz",
      "metadata": {
        "name": "John's Updated Channel",
        "summary": "Updated collection of curated content",
        "keywords": ["updated", "media", "collection"]
      }
    }
  }
}
```

### Best Practices

* **Meaningful Metadata**: Use clear and concise metadata to make your channel easy to identify and navigate.
* **Organized Playlists**: Structure your playlists within the channel for thematic consistency.
* **Error Handling**: Ensure proper error handling for cases like invalid IDs or missing fields.
