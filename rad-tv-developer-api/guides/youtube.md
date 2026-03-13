# YouTube integration

Connect a YouTube account, browse videos, import YouTube content into Rad TV, or publish Rad TV content to YouTube.

## OAuth (browser)

- **Connect:** `GET /youtube/connect` — Redirects to Google OAuth. User signs in and authorizes.
- **Callback:** `GET /youtube/callback` — Your app receives the OAuth code here (handled by the server).
- **Disconnect:** `POST /youtube/disconnect` — Revokes the token and removes the YouTube connection. Requires Bearer auth.

## Check connection

**GraphQL:**

```graphql
query {
  me {
    youtube {
      connected
      channelId
      channelTitle
      channelThumbnail
      hasUploadScope
    }
  }
}
```

**MCP:** Use `get_me`; the response includes `youtube` with the same fields.

## List YouTube videos

**GraphQL:**

```graphql
query {
  youtubeVideos(limit: 10) {
    videos {
      videoId
      title
      thumbnail
      duration
      viewCount
    }
    nextPageToken
    totalResults
  }
}
```

**MCP:** `list_youtube_videos` with optional `pageToken` and `limit`. Requires a connected YouTube account.

## Import YouTube video into Rad TV

Creates a Rad TV content item using metadata (title, description, tags, thumbnail) from YouTube.

**GraphQL:**

```graphql
mutation {
  createContentFromYouTube(videoId: "dQw4w9WgXcQ") {
    id
    metadata { title summary }
  }
}
```

**MCP:** `create_content_from_youtube` with `videoId` and optional `channel` (channel DID). Requires connected YouTube.

## Publish Rad TV content to YouTube

Starts a background job that streams the video from the Rad TV CDN to YouTube. Returns a job ID; poll for status.

**GraphQL:**

```graphql
mutation {
  publishContentToYouTube(
    id: "did:rad.live:content/feature:abc123"
    privacyStatus: PUBLIC
  ) {
    id
    status
    progress
  }
}
```

**MCP:** `publish_content_to_youtube` with `id` (content DID) and optional `privacyStatus` (PUBLIC, UNLISTED, PRIVATE; default PRIVATE).

**Poll for completion:**

**GraphQL:**

```graphql
query {
  youtubePublishJob(id: "<job-id>") {
    status
    progress
    youtubeVideoId
    youtubeUrl
    error
  }
}
```

**MCP:** `get_youtube_publish_job` with `id` (job id).

**Job status:** PENDING → UPLOADING → PROCESSING → COMPLETE or ERROR. Progress is 0–100. The upload is resumable; progress is updated periodically (e.g. every few seconds) in the database.
