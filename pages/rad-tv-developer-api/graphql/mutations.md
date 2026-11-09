---
title: Mutations
---

> [!NOTE]
> All mutations are executed via `POST /graphql` with a JSON body. All require the header:
>
> `Authorization: Bearer <token>`

## GraphQL mutations

### Mutation list

| Mutation                                              | Description                                    |
| ----------------------------------------------------- | ---------------------------------------------- |
| `createContent(channel?, input)`                      | Create content (optional channel DID)          |
| `updateContent(id?, input)`                           | Update content metadata/hints                  |
| `createContentAsset(id, input)`                       | Create TUS upload session for content          |
| `createPlaylist(channel?, input)`                     | Create playlist                                |
| `updatePlaylist(id, input)`                           | Update playlist metadata                       |
| `createPlaylistAsset(id, input)`                      | Create TUS upload session for playlist image   |
| `submitContentForProcessing(id, input)`               | Submit for transcoding (layout, encoder)       |
| `publishContent(id)`                                  | Make content public                            |
| `unpublishContent(id)`                                | Revert to protected                            |
| `likeContent(id)` / `unlikeContent(id)`               | Like/unlike (idempotent)                       |
| `followChannel(channel)` / `unfollowChannel(channel)` | Follow/unfollow channel                        |
| `createComment(contentId, body)`                      | Create comment on content                      |
| `createContentFromYouTube(channel?, videoId)`         | Import YouTube video as content                |
| `publishContentToYouTube(id, privacyStatus?)`         | Publish Rad content to YouTube (returns job)   |
| `predictVirality(input)`                              | Predict virality score (Creator+ subscription) |

### Content and ingestion flow

<a id="create-content"></a>

### Step 1: Create content

Call `createContent` — Create a content item (optional channel).

<a id="create-ingestion-session"></a>

### Step 2: Create ingestion session

Call `createContentAsset` — Get an ingestion session (TUS endpoint).

<a id="upload-file"></a>

### Step 3: Upload file

Upload the file to the session endpoint (see [Content and uploads](../content-and-uploads.md)).

<a id="submit-for-processing"></a>

### Step 4: Submit for processing

Call `submitContentForProcessing` — Submit for transcoding.

<a id="publish-optional"></a>

### Step 5: Publish (optional)

Optionally call `publishContent` to make it public.

### Idempotent mutations

* `likeContent` / `like` — Calling multiple times has no additional effect.
* `unlikeContent` / `unlike` — No effect if the content is not liked.
* `followChannel` / `follow` — Idempotent.
* `unfollowChannel` / `unfollow` — Idempotent.
