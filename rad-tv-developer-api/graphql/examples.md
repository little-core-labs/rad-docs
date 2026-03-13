# Examples

All examples assume `Authorization: Bearer <token>` unless the operation is public.

## Current user and channel

```graphql
query {
  me {
    id
    username
    email
    channel {
      id
      metadata {
        name
        summary
      }
    }
    followedChannels {
      id
      metadata { name summary }
    }
  }
}
```

## Categories (auth required)

```graphql
query {
  categories(limit: 50, start: 0) {
    id
    name
    summary
    shortSummary
  }
}
```

## Ratings (public; no auth)

```graphql
query {
  ratings(limit: 50, start: 0) {
    name
    system
  }
}
```

## Genres (public; no auth)

```graphql
query {
  genres(limit: 50, start: 0) {
    name
  }
}
```

## Comments for content

```graphql
query {
  comments(contentId: "did:rad.live:content/feature:xyz", limit: 25, start: 0) {
    id
    body
    contentId
    createdAt
    updatedAt
    author { id username }
  }
}
```

## Channel with catalog (features and likes)

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

## Content output assets (via me.channel)

```graphql
query {
  me {
    channel {
      features(limit: 5, start: 0) {
        metadata { title }
        outputAssets {
          encoderType
          video { hls download preview }
          images { thumbnails { urlFormat count } }
          subtitles { srt vtt }
        }
      }
    }
  }
}
```

## Create content

```graphql
mutation {
  createContent(
    input: {
      hints: [{ type: FEATURE, containsAds: NO }]
      metadata: {
        title: "My Video"
        summary: "Video description"
      }
    }
  ) {
    id
    metadata { title }
  }
}
```

## Follow / unfollow channel

```graphql
mutation {
  followChannel(channel: "did:rad.live:channel/<channel-uuid>") {
    ok
  }
}

mutation {
  unfollowChannel(channel: "did:rad.live:channel/<channel-uuid>") {
    ok
  }
}
```

## Like / unlike content

```graphql
mutation {
  likeContent(id: "did:rad.live:content/feature/abc123") {
    id
    likes { count isLiked }
  }
}

mutation {
  unlikeContent(id: "did:rad.live:content/feature/abc123") {
    id
    likes { count isLiked }
  }
}
```

## Create comment

```graphql
mutation {
  createComment(
    contentId: "did:rad.live:content/feature:xyz"
    body: "Great video!"
  ) {
    id
    body
    contentId
    createdAt
    author { id username }
  }
}
```

## YouTube: check connection and list videos

```graphql
query {
  me {
    youtube {
      connected
      channelId
      channelTitle
      hasUploadScope
    }
  }
}

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

## YouTube: import and publish

```graphql
mutation {
  createContentFromYouTube(videoId: "dQw4w9WgXcQ") {
    id
    metadata { title summary }
  }
}

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

Poll for publish job status:

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
