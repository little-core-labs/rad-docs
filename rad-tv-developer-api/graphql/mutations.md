# Mutations

{% hint style="info" %}
All mutations are executed via `POST /graphql` with a JSON body. All require the header:

`Authorization: Bearer <token>`
{% endhint %}

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

{% stepper %}
{% step %}
### Create content

Call `createContent` — Create a content item (optional channel).
{% endstep %}

{% step %}
### Create ingestion session

Call `createContentAsset` — Get an ingestion session (TUS endpoint).
{% endstep %}

{% step %}
### Upload file

Upload the file to the session endpoint (see [Content and uploads](../content-and-uploads.md)).
{% endstep %}

{% step %}
### Submit for processing

Call `submitContentForProcessing` — Submit for transcoding.
{% endstep %}

{% step %}
### Publish (optional)

Optionally call `publishContent` to make it public.
{% endstep %}
{% endstepper %}

### Idempotent mutations

* `likeContent` / `like` — Calling multiple times has no additional effect.
* `unlikeContent` / `unlike` — No effect if the content is not liked.
* `followChannel` / `follow` — Idempotent.
* `unfollowChannel` / `unfollow` — Idempotent.
