---
title: Engagement
---

The API supports likes, comments, and channel follow/unfollow. Catalog types (Feature, Episode, Stream, etc.) and Content implement like and comment interfaces.

## Likes

### Likeable entities

Content and catalog types (Feature, Episode, Stream, Serie, Season, Miniseries) implement **Likeable**: they have `id` (DID) and `likes: ContentLikes`. `ContentLikes` has:

* **count** — Total like count
* **isLiked** — Whether the current authenticated user has liked the entity

> [!NOTE]
> `likes` is never null; when unauthenticated or on error, `count` is `0` and `isLiked` is `false`.

<a id="like-unlike-by-did"></a>

### Like / unlike (by DID)

GraphQL:

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

MCP: `like_content`, `unlike_content` with `id` (content DID).

> [!NOTE]
> Both mutations are idempotent: calling `likeContent` multiple times does not change the result; calling `unlikeContent` on unliked content has no effect.

## Comments

### Listing comments

GraphQL: `comments(contentId: DID!, limit: Int, start: Int)`\
MCP: `list_comments` with `contentId`, optional `limit`, `start`.

Commentable entities (Content and catalog types) also expose `comments(limit, start)` on the type itself.

### Creating a comment

GraphQL:

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

MCP: `create_comment` with `contentId` and `body`.

The authenticated user is set as the comment author. Comments are stored and queried via the User API (12core).

<a id="channel-follow-unfollow"></a>

## Channel follow / unfollow

<a id="follow-unfollow"></a>

### Follow / unfollow

GraphQL:

```graphql
mutation {
  followChannel(channel: "did:rad.live:channel/<uuid>") { ok }
}

mutation {
  unfollowChannel(channel: "did:rad.live:channel/<uuid>") { ok }
}
```

MCP: `follow_channel`, `unfollow_channel` with `channel` (channel DID).

> [!NOTE]
> Follow/unfollow are idempotent. Channels expose `followersCount` and `isFollowed` (whether the current user follows).

### Followed channels

GraphQL: `me.followedChannels`\
MCP: `list_followed_channels` (no arguments).
