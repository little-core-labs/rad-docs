# GraphQL mutations

All mutations are executed via `POST /graphql` with a JSON body. All require `Authorization: Bearer <token>`.

## Mutation list

| Mutation | Description |
|----------|-------------|
| `createContent(channel?, input)` | Create content (optional channel DID) |
| `updateContent(id?, input)` | Update content metadata/hints |
| `createContentAsset(id, input)` | Create TUS upload session for content |
| `createPlaylist(channel?, input)` | Create playlist |
| `updatePlaylist(id, input)` | Update playlist metadata |
| `createPlaylistAsset(id, input)` | Create TUS upload session for playlist image |
| `submitContentForProcessing(id, input)` | Submit for transcoding (layout, encoder) |
| `publishContent(id)` | Make content public |
| `unpublishContent(id)` | Revert to protected |
| `likeContent(id)` / `unlikeContent(id)` | Like/unlike (idempotent) |
| `like(targetLrn)` / `unlike(targetLrn)` | Like/unlike by LRN (idempotent) |
| `followChannel(channel)` / `unfollowChannel(channel)` | Follow/unfollow channel |
| `follow(targetLrn)` / `unfollow(targetLrn)` | Follow/unfollow by LRN (idempotent) |
| `createComment(contentId, body)` | Create comment on content |
| `createCommentByLrn(targetLrn, body)` | Create comment on commentable by LRN |
| `createContentFromYouTube(channel?, videoId)` | Import YouTube video as content |
| `publishContentToYouTube(id, privacyStatus?)` | Publish Rad content to YouTube (returns job) |
| `predictVirality(input)` | Predict virality score (Creator+ subscription) |

## Content and ingestion flow

1. `createContent` — Create a content item (optional channel).
2. `createContentAsset` — Get an ingestion session (TUS endpoint).
3. Upload the file to the session endpoint (see [Content and uploads](../guides/content-and-uploads.md)).
4. `submitContentForProcessing` — Submit for transcoding.
5. Optionally `publishContent` to make it public.

## Idempotent mutations

- `likeContent` / `like` — Calling multiple times has no additional effect.
- `unlikeContent` / `unlike` — No effect if the content is not liked.
- `followChannel` / `follow` — Idempotent.
- `unfollowChannel` / `unfollow` — Idempotent.

## Examples

See [Examples](examples.md) for mutation samples (createContent, followChannel, unfollowChannel, likeContent, createComment).
